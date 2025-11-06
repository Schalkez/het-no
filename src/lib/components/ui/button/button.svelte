<script lang="ts">
  import type { VariantProps } from 'class-variance-authority';

  import { buttonVariants } from './variants';
  import { cn } from '$lib/utils/cn';

  type ButtonVariants = VariantProps<typeof buttonVariants>;

  export let variant: ButtonVariants['variant'] = 'default';
  export let size: ButtonVariants['size'] = 'default';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let className = '';
</script>

<button
  class={cn(buttonVariants({ variant, size }), className)}
  {type}
  {disabled}
  on:click
  on:keydown
  {...$$restProps}
>
  <slot />
</button>
