<script lang="ts">
  import { onDestroy } from 'svelte';

  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import CardHeader from '$lib/components/ui/card/card-header.svelte';
  import CardTitle from '$lib/components/ui/card/card-title.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import { moneyCalcStore } from '$lib/stores/money-calc';
  import { formatNumber, parseNumber } from '$lib/utils/number';

  let serviceNameInput: HTMLInputElement | null = null;
  let costInput: HTMLInputElement | null = null;

  $: moneyCalcStore.registerServiceNameInput(serviceNameInput);
  $: moneyCalcStore.registerCostInput(costInput);

  onDestroy(() => {
    moneyCalcStore.registerServiceNameInput(null);
    moneyCalcStore.registerCostInput(null);
  });

  const closeMobileSheet = () => {
    moneyCalcStore.setIsAddServiceSheetOpen(false);
    moneyCalcStore.setNewService(() => ({ name: '', cost: 0, id: '' }));
  };

  const handleOverlayKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closeMobileSheet();
    }
  };
</script>

<Card className="hidden md:block">
  <CardHeader>
    <CardTitle>Thêm dịch vụ</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <Input
      bind:element={serviceNameInput}
      className="md:h-11 md:text-base"
      placeholder="Tên dịch vụ"
      value={$moneyCalcStore.newService.name}
      on:input={(event) => {
        const target = event.currentTarget as HTMLInputElement;
        moneyCalcStore.setNewService((service) => ({ ...service, name: target.value }));
      }}
    />

    <div class="relative">
      <Input
        bind:element={costInput}
        className="pr-10 md:h-11 md:text-base"
        placeholder="Số tiền"
        type="text"
        value={formatNumber($moneyCalcStore.newService.cost)}
        on:input={(event) => {
          const target = event.currentTarget as HTMLInputElement;
          const cost = parseNumber(target.value);
          moneyCalcStore.setNewService((service) => ({ ...service, cost }));
        }}
        on:keydown={moneyCalcStore.handleCostKeyDown}
      />
      {#if $moneyCalcStore.newService.cost > 0}
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-destructive"
          on:click={moneyCalcStore.resetServiceCost}
          title="Xóa số tiền"
        >
          ×
        </Button>
      {/if}
      {#if $moneyCalcStore.newService.cost > 0 && $moneyCalcStore.newService.cost % 1000 !== 0}
        <span
          class="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-muted-foreground md:text-sm"
        >
          {formatNumber(Math.round($moneyCalcStore.newService.cost / 1000) * 1000)}đ
        </span>
      {/if}
    </div>

    <Button className="w-full md:text-base" on:click={() => moneyCalcStore.handleAddServiceClick()}>
      + Thêm dịch vụ
    </Button>
  </CardContent>
</Card>

<!-- Removed mobile trigger button: ServiceList cung cấp nút mở sheet -->

{#if $moneyCalcStore.isAddServiceSheetOpen}
  <div class="fixed inset-0 z-40 flex items-end md:hidden">
    <div
      class="absolute inset-0 bg-black/60"
      role="button"
      tabindex={0}
      aria-label="Đóng biểu mẫu thêm dịch vụ"
      on:click={closeMobileSheet}
      on:keydown={handleOverlayKeyDown}
    ></div>
    <div class="relative w-full rounded-t-2xl bg-background p-4 shadow-lg">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Thêm dịch vụ</h2>
        <Button variant="ghost" size="sm" on:click={closeMobileSheet}>×</Button>
      </div>

      <div class="space-y-4">
        <Input
          placeholder="Tên dịch vụ"
          value={$moneyCalcStore.newService.name}
          on:input={(event) => {
            const target = event.currentTarget as HTMLInputElement;
            moneyCalcStore.setNewService((service) => ({ ...service, name: target.value }));
          }}
          on:keydown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              moneyCalcStore.handleAddService();
              closeMobileSheet();
            }
          }}
        />
        <div class="relative">
          <Input
            className="pr-10"
            placeholder="Số tiền"
            type="text"
            value={formatNumber($moneyCalcStore.newService.cost)}
            on:input={(event) => {
              const target = event.currentTarget as HTMLInputElement;
              const cost = parseNumber(target.value);
              moneyCalcStore.setNewService((service) => ({ ...service, cost }));
            }}
            on:keydown={moneyCalcStore.handleCostKeyDown}
          />
          {#if $moneyCalcStore.newService.cost > 0}
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-destructive"
              on:click={moneyCalcStore.resetServiceCost}
              title="Xóa số tiền"
            >
              ×
            </Button>
          {/if}
          {#if $moneyCalcStore.newService.cost > 0 && $moneyCalcStore.newService.cost % 1000 !== 0}
            <span class="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {formatNumber(Math.round($moneyCalcStore.newService.cost / 1000) * 1000)}đ
            </span>
          {/if}
        </div>
      </div>

      <Button
        className="mt-6 w-full"
        on:click={() => {
          moneyCalcStore.handleAddServiceClick();
          closeMobileSheet();
        }}
      >
        + Thêm dịch vụ
      </Button>
    </div>
  </div>
{/if}
