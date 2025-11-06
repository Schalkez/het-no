<script lang="ts">
  import { moneyCalcStore } from '$lib/stores/money-calc';
  import { startMoneyCalcTour } from '$lib/tour/money-calc-tour';

  const handleResetAll = moneyCalcStore.handleResetAll;

  $: isResetting = $moneyCalcStore.status.isResetting;
  $: hasData = $moneyCalcStore.people.length > 0 || $moneyCalcStore.services.length > 0;
</script>

<header class="fixed inset-x-0 top-0 z-20 bg-gradient-to-r from-[#E5E8FF] via-[#ECEFF7] to-[#F6F7FB] shadow-md shadow-black/5 backdrop-blur-md">
  <div
    class="mx-auto flex h-[60px] max-w-4xl items-center justify-between px-5 md:h-[70px] lg:px-0"
  >
    <h1 class="flex items-center gap-2">
      <img src="/chia-tien.svg" alt="chia-tien-logo" class="h-14 filter-[brightness(2)] md:h-18" />
    </h1>

    <div class="flex items-center gap-2">
      <button
        class="cursor-pointer rounded-md border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        on:click={startMoneyCalcTour}
      >
        Hướng dẫn nhanh
      </button>
      <button
        class="cursor-pointer rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white transition hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        on:click={handleResetAll}
        disabled={isResetting || !hasData}
        aria-busy={isResetting}
      >
        {#if isResetting}
          Đang reset...
        {:else}
          Reset Toàn Bộ
        {/if}
      </button>
    </div>
  </div>
</header>
