<script lang="ts">
  import { cn } from '$lib/utils/cn';

  export let className = '';

  const baseClass = 'flex flex-col space-y-1.5 p-6';
</script>

<div class={cn(baseClass, className)} {...$$restProps}>
  <slot />
</div>
