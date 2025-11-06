<script lang="ts">
  import { cn } from '$lib/utils/cn';

  export let type = 'text';
  export let disabled = false;
  export let element: HTMLInputElement | null = null;
  export let className = '';

  let internal: HTMLInputElement | null = null;

  const baseClass =
    'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  $: element = internal;
</script>

<input
  bind:this={internal}
  class={cn(baseClass, className)}
  {type}
  {disabled}
  on:input
  on:change
  on:keydown
  {...$$restProps}
/>
