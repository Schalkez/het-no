<script lang="ts">
  import { cn } from '$lib/utils/cn';

  export let className = '';

  const baseClass = 'p-6 pt-0';
</script>

<div class={cn(baseClass, className)} {...$$restProps}>
  <slot />
</div>
