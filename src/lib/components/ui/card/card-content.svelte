<script lang="ts">
  import { cn } from '$lib/utils/cn';

  export let className = '';

const baseClass = 'p-6 pt-6';
</script>

<div class={cn(baseClass, className)} {...$$restProps}>
  <slot />
</div>
