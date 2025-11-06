<script lang="ts">
  import { get } from 'svelte/store';
  import { onDestroy } from 'svelte';

  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import CardHeader from '$lib/components/ui/card/card-header.svelte';
  import CardTitle from '$lib/components/ui/card/card-title.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import ReceiptIcon from '$lib/components/ui/icons/receipt.svelte';
  import { moneyCalcStore } from '$lib/stores/money-calc';
  import { formatNumber, parseNumber } from '$lib/utils/number';

  let serviceNameInput: HTMLInputElement | null = null;
  let costInput: HTMLInputElement | null = null;

  $: moneyCalcStore.registerServiceNameInput(serviceNameInput);
  $: moneyCalcStore.registerCostInput(costInput);

  $: isAddingService = $moneyCalcStore.status.isAddingService;
  $: trimmedServiceName = $moneyCalcStore.newService.name.trim();
  $: canSubmitService =
    trimmedServiceName.length > 0 && $moneyCalcStore.newService.cost > 0 && !isAddingService;

  onDestroy(() => {
    moneyCalcStore.registerServiceNameInput(null);
    moneyCalcStore.registerCostInput(null);
  });

  const closeMobileSheet = () => {
    moneyCalcStore.setIsAddServiceSheetOpen(false);
    moneyCalcStore.setNewService(() => ({ name: '', cost: 0, id: '' }));
  };

  const attemptAddService = () => {
    const beforeName = get(moneyCalcStore).newService.name.trim();
    moneyCalcStore.handleAddServiceClick();
    const afterName = get(moneyCalcStore).newService.name.trim();

    if (beforeName !== '' && afterName === '') {
      closeMobileSheet();
    }
  };

  const handleOverlayKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closeMobileSheet();
    }
  };
</script>

<Card className="hidden shadow-xl shadow-black/5 md:block" data-tour="add-service">
  <CardHeader className="flex-row items-center gap-3 border-b border-border/60 bg-gradient-to-r from-secondary/15 via-secondary/10 to-transparent pb-4">
    <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/25 text-secondary-foreground">
      <ReceiptIcon size={22} />
    </div>
    <div class="space-y-1">
      <CardTitle>Thêm dịch vụ</CardTitle>
      <p class="text-sm text-muted-foreground">Ghi tên khoản chi và số tiền đã chi.</p>
    </div>
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
      disabled={isAddingService}
      aria-busy={isAddingService}
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
        disabled={isAddingService}
        aria-busy={isAddingService}
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

    <Button
      className="w-full md:text-base"
      on:click={() => moneyCalcStore.handleAddServiceClick()}
      disabled={!canSubmitService}
      aria-busy={isAddingService}
    >
      {#if isAddingService}
        Đang thêm...
      {:else}
        <ReceiptIcon size={18} />
        Thêm dịch vụ
      {/if}
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
    <div class="relative w-full rounded-t-3xl bg-background/95 p-4 shadow-xl backdrop-blur" data-tour="add-service">
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
              attemptAddService();
            }
          }}
          disabled={isAddingService}
          aria-busy={isAddingService}
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
            disabled={isAddingService}
            aria-busy={isAddingService}
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
        on:click={attemptAddService}
        disabled={!canSubmitService}
        aria-busy={isAddingService}
      >
        {#if isAddingService}
          Đang thêm...
        {:else}
          <ReceiptIcon size={18} />
          Thêm dịch vụ
        {/if}
      </Button>
    </div>
  </div>
{/if}
