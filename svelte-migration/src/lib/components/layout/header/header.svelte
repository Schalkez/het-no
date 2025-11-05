<script lang="ts">
  import { moneyCalcStore } from '$lib/stores/money-calc';

  const handleResetAll = moneyCalcStore.handleResetAll;
</script>

<header class="fixed inset-x-0 top-0 z-20 bg-[#EAECEF] shadow-md shadow-gray-400">
  <div
    class="mx-auto flex h-[60px] max-w-4xl items-center justify-between px-5 md:h-[70px] lg:px-0"
  >
    <h1 class="flex items-center gap-2">
      <img src="/chia-tien.svg" alt="chia-tien-logo" class="h-14 filter-[brightness(2)] md:h-18" />
    </h1>

    <button
      class="cursor-pointer rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white transition hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      on:click={handleResetAll}
    >
      Reset Toàn Bộ
    </button>
  </div>
</header>
