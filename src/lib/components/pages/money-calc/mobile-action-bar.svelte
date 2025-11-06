<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { moneyCalcStore } from '$lib/stores/money-calc';

  const openServiceSheet = () => {
    moneyCalcStore.setIsAddServiceSheetOpen(true);
  };

  const openResultSheet = () => {
    if (!$moneyCalcStore.isResultSheetOpen) {
      moneyCalcStore.setIsResultSheetOpen(true);
    } else {
      moneyCalcStore.setIsResultSheetOpen(false);
    }
  };
</script>

<div class="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden">
  <div
    class="pointer-events-auto mx-auto mb-4 flex w-[calc(100%-1.5rem)] max-w-4xl items-center gap-3 rounded-2xl border border-border bg-background/95 px-4 py-3 shadow-xl backdrop-blur"
  >
    <Button className="flex-1" on:click={openServiceSheet}>+ Thêm dịch vụ</Button>
    <Button
      variant={$moneyCalcStore.isResultSheetOpen ? 'secondary' : 'outline'}
      className="whitespace-nowrap"
      on:click={openResultSheet}
    >
      {$moneyCalcStore.isResultSheetOpen ? 'Đóng kết quả' : 'Kết quả'}
    </Button>
  </div>
</div>
