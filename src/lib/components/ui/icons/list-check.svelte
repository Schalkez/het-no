<script lang="ts">
  export let size = 20;
  export let strokeWidth = 1.8;
  export let className = '';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  class={className}
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d="M9 6h11" />
  <path d="M9 12h11" />
  <path d="M9 18h11" />
  <path d="m4 6 1.5 1.5L7.5 5" />
  <path d="m4 12 1.5 1.5L7.5 11" />
  <path d="m4 18 1.5 1.5L7.5 17" />
</svg>

