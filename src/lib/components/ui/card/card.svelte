<script lang="ts">
  import { cn } from '$lib/utils/cn';

  export let className = '';

const baseClass =
  'rounded-3xl border border-border/70 bg-card/95 text-card-foreground shadow-lg shadow-black/5 backdrop-blur-sm';
</script>

<div class={cn(baseClass, className)} {...$$restProps}>
  <slot />
</div>
