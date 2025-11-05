<script lang="ts">
  import { cn } from '$lib/utils/cn';

  export let className = '';

  const baseClass = 'text-lg font-semibold leading-none tracking-tight';
</script>

<h3 class={cn(baseClass, className)} {...$$restProps}>
  <slot />
</h3>
