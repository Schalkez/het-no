<script lang="ts">
  import Header from '$lib/components/layout/header/header.svelte';
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
  <Header />
  <main class="flex-1 pt-[60px] md:pt-[70px]">
    <slot />
  </main>
</div>
