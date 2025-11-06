<script lang="ts">
  import { cn } from '$lib/utils/cn';

  export let checked: boolean | undefined = undefined;
  export let indeterminate = false;
  export let disabled = false;
  export let className = '';

  let element: HTMLInputElement | null = null;

  const baseClass =
    'h-4 w-4 rounded border-border text-primary focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  $: {
    if (element) {
      element.indeterminate = indeterminate;
    }
  }
</script>

<input
  bind:this={element}
  bind:checked
  class={cn(baseClass, className)}
  {disabled}
  type="checkbox"
  on:change
  on:keydown
  {...$$restProps}
/>
