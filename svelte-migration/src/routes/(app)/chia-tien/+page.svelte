<script lang="ts">
  import AddPersonArea from '$lib/components/pages/money-calc/add-person-area.svelte';
  import AddServiceArea from '$lib/components/pages/money-calc/add-service-area.svelte';
  import OnboardingHero from '$lib/components/pages/money-calc/onboarding-hero.svelte';
  import MobileActionBar from '$lib/components/pages/money-calc/mobile-action-bar.svelte';
  import ResultArea from '$lib/components/pages/money-calc/result-area.svelte';
  import ServiceList from '$lib/components/pages/money-calc/service-list.svelte';
  import { moneyCalcStore } from '$lib/stores/money-calc';
</script>

<svelte:head>
  <title>Chia Tiền Nhóm - Tính Toán Công Bằng &amp; Nhanh Chóng</title>
  <meta
    name="description"
    content="Tính toán và chia tiền công bằng cho nhóm bạn bè, hội nhóm chỉ trong vài giây. Nhập số tiền, số người, và xem kết quả ngay!"
  />
</svelte:head>

<main class="relative min-h-screen bg-[#F3F4F6] pb-40 pt-10 md:pt-20">
  {#if $moneyCalcStore.error}
    <div
      class="fixed left-1/2 top-4 z-30 w-[calc(100%-2rem)] -translate-x-1/2 rounded-md bg-destructive px-4 py-2 text-center text-sm font-medium text-destructive-foreground shadow-lg md:w-auto"
    >
      {$moneyCalcStore.error}
    </div>
  {/if}

  <div class="mx-auto max-w-4xl px-4 pb-24 md:px-6 md:pb-10">
    <OnboardingHero />
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      <AddPersonArea />
      <AddServiceArea />
    </div>
    <div class="mt-4 space-y-4 md:mt-6">
      <ServiceList />
      <ResultArea />
    </div>
  </div>
  <MobileActionBar />
</main>
