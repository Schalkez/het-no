<script lang="ts">
  import { onDestroy } from 'svelte';

  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import CardHeader from '$lib/components/ui/card/card-header.svelte';
  import CardTitle from '$lib/components/ui/card/card-title.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import { moneyCalcStore } from '$lib/stores/money-calc';

  let personInput: HTMLInputElement | null = null;

  $: moneyCalcStore.registerPersonInput(personInput);

  onDestroy(() => {
    moneyCalcStore.registerPersonInput(null);
  });
</script>

<Card>
  <CardHeader>
    <CardTitle>Người tham gia</CardTitle>
  </CardHeader>
  <CardContent>
    <div class="mb-5 flex flex-wrap items-center gap-3">
      <Input
        bind:element={personInput}
        className="flex-1 min-w-[220px] md:h-11 md:text-base"
        placeholder="Tên người tham gia"
        value={$moneyCalcStore.newPerson}
        on:input={(event) =>
          moneyCalcStore.setNewPerson((event.currentTarget as HTMLInputElement).value)}
        on:keydown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            moneyCalcStore.addPerson($moneyCalcStore.newPerson);
          }
        }}
      />
      <Button
        on:click={() => moneyCalcStore.addPerson($moneyCalcStore.newPerson)}
        className="md:h-11"
      >
        + Thêm
      </Button>
    </div>

    {#if $moneyCalcStore.people.length > 0}
      <ul class="flex flex-wrap gap-2">
        {#each $moneyCalcStore.people as person (person)}
          <li
            class="flex items-center rounded-md bg-muted px-2 py-1 text-sm text-foreground md:text-base"
          >
            <img
              alt={`Avatar của ${person}`}
              class="mr-2 h-6 w-6 rounded-full"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(person)}&background=random`}
            />
            <span>{person}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-full text-lg text-gray-500 hover:text-destructive"
              on:click={() => moneyCalcStore.handleRemovePerson(person)}
              aria-label={`Xóa ${person}`}
            >
              ×
            </Button>
          </li>
        {/each}
      </ul>
    {:else}
      <div class="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm">
        <p class="font-semibold text-foreground">Chưa có người tham gia nào.</p>
        <p class="mt-1 text-muted-foreground">
          Nhập tên ở ô bên trên rồi nhấn Enter hoặc bấm nút “+ Thêm” để lưu. Bạn có thể dán nhiều
          tên cùng lúc, mỗi tên trên một dòng.
        </p>
      </div>
    {/if}
  </CardContent>
</Card>
