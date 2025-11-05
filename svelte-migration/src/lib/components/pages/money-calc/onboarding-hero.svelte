<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { moneyCalcStore } from '$lib/stores/money-calc';

  const heroSteps = [
    {
      label: 'Thêm người',
      description: 'Nhập tên từng thành viên trong nhóm của bạn.'
    },
    {
      label: 'Ghi dịch vụ',
      description: 'Đặt tên và số tiền cho mỗi dịch vụ, tick người sử dụng.'
    },
    {
      label: 'Xem kết quả',
      description: 'Hệ thống tính toán tự động ai nhận/ai trả và số tiền.'
    }
  ];

  const focusPersonInput = () => {
    moneyCalcStore.focusPersonInput();
  };

  const openAddService = () => {
    moneyCalcStore.setIsAddServiceSheetOpen(true);
  };

  $: hasPeople = $moneyCalcStore.people.length > 0;
  $: hasServices = $moneyCalcStore.services.length > 0;
  $: showHero = !hasPeople && !hasServices;
  $: showServiceCallout = hasPeople && !hasServices;
</script>

{#if showHero}
  <section
    class="mb-6 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/15 via-primary/10 to-transparent p-6 shadow-sm"
  >
    <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div class="space-y-3 md:max-w-lg">
        <p class="text-sm font-semibold uppercase tracking-wider text-primary">
          Chia tiền nhóm dễ dàng
        </p>
        <h1 class="text-2xl font-semibold text-foreground md:text-3xl">
          Hoàn thành 3 bước để chia tiền công bằng cho cả nhóm
        </h1>
        <p class="text-sm text-muted-foreground md:text-base">
          Thêm thành viên, ghi lại những khoản đã chi và nhận ngay bảng tổng kết. Không cần bảng
          tính phức tạp.
        </p>
      </div>

      <div class="hidden md:block">
        <div
          class="rounded-2xl border border-primary/30 bg-background/80 px-5 py-4 shadow-sm backdrop-blur"
        >
          <ul class="space-y-3">
            {#each heroSteps as step, index (step.label)}
              <li class="flex items-start gap-3">
                <span
                  class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground"
                >
                  {index + 1}
                </span>
                <div>
                  <p class="text-sm font-semibold text-foreground">{step.label}</p>
                  <p class="text-xs text-muted-foreground md:text-sm">{step.description}</p>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
      <Button className="w-full md:w-auto" on:click={focusPersonInput}>
        + Thêm người đầu tiên
      </Button>
      <div class="text-sm text-muted-foreground">
        Mẹo: nhấn Enter để lưu nhanh, hoặc dán toàn bộ danh sách tên cùng lúc.
      </div>
    </div>
  </section>
{:else if showServiceCallout}
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
        + Thêm dịch vụ
      </Button>
    </div>
  </section>
{/if}
