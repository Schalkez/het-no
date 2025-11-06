<script lang="ts">
  import Header from '$lib/components/layout/header/header.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
  <Header />
  <main class="flex-1 pt-[60px] md:pt-[70px]">
    <slot />
  </main>
  <Toaster position="top-center" richColors closeButton duration={3000} />
</div>
