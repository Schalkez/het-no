<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import ReceiptIcon from '$lib/components/ui/icons/receipt.svelte';
  import { moneyCalcStore } from '$lib/stores/money-calc';

  const openAddService = () => {
    moneyCalcStore.setIsAddServiceSheetOpen(true);
  };

  $: hasPeople = $moneyCalcStore.people.length > 0;
  $: hasServices = $moneyCalcStore.services.length > 0;
  $: showServiceCallout = hasPeople && !hasServices;
</script>

{#if showServiceCallout}
  <section class="mb-6 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="space-y-2">
        <p class="text-sm font-medium text-primary">Bước tiếp theo</p>
        <h2 class="text-xl font-semibold text-foreground md:text-2xl">
          Ghi dịch vụ đầu tiên của bạn
        </h2>
        <p class="text-sm text-muted-foreground md:text-base">
          Đặt tên khoản chi, nhập số tiền và tick những ai sử dụng. Bạn có thể chia đều hoặc chỉnh
          sửa từng người.
        </p>
      </div>
      <Button className="w-full md:w-auto" variant="secondary" on:click={openAddService}>
        <ReceiptIcon size={18} />
        Thêm dịch vụ
      </Button>
    </div>
  </section>
{/if}
