<script lang="ts">
  import { cn } from '$lib/utils/cn';

  export let className = '';

  const baseClass = 'rounded-2xl border border-border bg-card text-card-foreground shadow-sm';
</script>

<div class={cn(baseClass, className)} {...$$restProps}>
  <slot />
</div>
