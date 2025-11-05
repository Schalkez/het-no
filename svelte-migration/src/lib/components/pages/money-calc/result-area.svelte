<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import CardHeader from '$lib/components/ui/card/card-header.svelte';
  import CardTitle from '$lib/components/ui/card/card-title.svelte';
  import { moneyCalcStore } from '$lib/stores/money-calc';

  const closeMobileSheet = () => {
    if ($moneyCalcStore.isResultSheetOpen) {
      moneyCalcStore.toggleResultSheet();
    }
  };

  const handleOverlayKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closeMobileSheet();
    }
  };
</script>

<div class="z-20 md:static md:z-auto">
  <Card className="hidden md:block">
    <CardHeader>
      <CardTitle>Kết quả chia tiền</CardTitle>
    </CardHeader>
    <CardContent>
      {#if Object.keys($moneyCalcStore.totals).length === 0}
        <p class="text-sm text-muted-foreground">Chưa có kết quả</p>
      {:else}
        <div class="space-y-3">
          {#each Object.entries($moneyCalcStore.totals) as [person, amount] (person)}
            <div
              class={`flex items-center gap-3 rounded-xl px-3 py-2 ${amount >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}`}
            >
              <img
                alt={`Avatar của ${person}`}
                class="h-8 w-8 rounded-full"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(person)}&background=random`}
              />
              <span class="flex-1 font-medium text-foreground">{person}</span>
              <span class="font-semibold">
                {amount >= 0 ? 'Nhận: ' : 'Trả: '}
                {Math.abs(amount).toLocaleString('vi-VN')}đ
              </span>
            </div>
          {/each}
        </div>
      {/if}

      {#if $moneyCalcStore.transactions.length > 0}
        <div class="mt-6 space-y-2">
          <h3 class="text-base font-semibold">Chi tiết thanh toán</h3>
          {#each $moneyCalcStore.transactions as transaction, index (transaction.from + '-' + transaction.to + '-' + transaction.amount + '-' + index)}
            <div class="flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
              <span class="flex-1 text-sm text-foreground">
                {transaction.from} trả cho {transaction.to}
              </span>
              <span class="text-sm font-semibold text-primary">
                {transaction.amount.toLocaleString('vi-VN')}đ
              </span>
            </div>
          {/each}
        </div>
      {/if}
    </CardContent>
  </Card>

  <section class="md:hidden">
    <Button
      className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-base font-semibold text-foreground shadow-sm"
      on:click={() => moneyCalcStore.toggleResultSheet()}
    >
      Kết quả chia tiền
    </Button>

    {#if $moneyCalcStore.isResultSheetOpen}
      <div class="fixed inset-0 z-40 flex items-end">
        <div
          class="absolute inset-0 bg-black/60"
          role="button"
          tabindex={0}
          aria-label="Đóng kết quả chia tiền"
          on:click={closeMobileSheet}
          on:keydown={handleOverlayKeyDown}
        ></div>
        <div class="relative w-full rounded-t-2xl bg-background p-5 shadow-xl">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold">Kết quả chia tiền</h2>
            <Button variant="ghost" size="sm" on:click={closeMobileSheet}>×</Button>
          </div>

          {#if Object.keys($moneyCalcStore.totals).length === 0}
            <p class="text-sm text-muted-foreground">Chưa có kết quả</p>
          {:else}
            <div class="max-h-56 space-y-3 overflow-y-auto pb-2">
              {#each Object.entries($moneyCalcStore.totals) as [person, amount] (person)}
                <div
                  class={`flex items-center gap-3 rounded-xl px-3 py-2 ${amount >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}`}
                >
                  <img
                    alt={`Avatar của ${person}`}
                    class="h-8 w-8 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(person)}&background=random`}
                  />
                  <span class="flex-1 text-sm text-foreground">{person}</span>
                  <span class="text-sm font-semibold">
                    {amount >= 0 ? 'Nhận: ' : 'Trả: '}
                    {Math.abs(amount).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              {/each}
            </div>
          {/if}

          {#if $moneyCalcStore.transactions.length > 0}
            <div class="mt-4">
              <h3 class="text-base font-semibold">Chi tiết thanh toán</h3>
              <div class="mt-2 max-h-56 space-y-2 overflow-y-auto pb-2">
                {#each $moneyCalcStore.transactions as transaction, index (transaction.from + '-' + transaction.to + '-' + transaction.amount + '-' + index)}
                  <div class="flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
                    <span class="flex-1 text-sm text-foreground">
                      {transaction.from} trả cho {transaction.to}
                    </span>
                    <span class="text-sm font-semibold text-primary">
                      {transaction.amount.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </section>
</div>
