<script lang="ts">
  import AddPersonArea from '$lib/components/pages/money-calc/add-person-area.svelte';
  import AddServiceArea from '$lib/components/pages/money-calc/add-service-area.svelte';
  import OnboardingHero from '$lib/components/pages/money-calc/onboarding-hero.svelte';
  import MobileActionBar from '$lib/components/pages/money-calc/mobile-action-bar.svelte';
  import ResultArea from '$lib/components/pages/money-calc/result-area.svelte';
  import ServiceList from '$lib/components/pages/money-calc/service-list.svelte';
</script>

<svelte:head>
  <title>Chia Tiền Nhóm - Tính Toán Công Bằng &amp; Nhanh Chóng</title>
  <meta
    name="description"
    content="Tính toán và chia tiền công bằng cho nhóm bạn bè, hội nhóm chỉ trong vài giây. Nhập số tiền, số người, và xem kết quả ngay!"
  />
</svelte:head>

<main class="relative min-h-screen bg-gradient-to-b from-[#F6F7FB] via-[#EEF2F7] to-[#E6ECFF] pb-40 pt-10 md:pt-20">
  <div class="pointer-events-none absolute inset-x-0 top-24 hidden h-64 max-w-5xl -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 blur-3xl md:left-1/2 md:block"></div>
  <div class="relative mx-auto max-w-4xl px-4 pb-24 md:px-6 md:pb-10">
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
