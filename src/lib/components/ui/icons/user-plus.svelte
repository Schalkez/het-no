<script lang="ts">
  export let size = 20;
  export let strokeWidth = 1.8;
  export let className = '';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  {size}
  width={size}
  height={size}
  class={className}
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d="M16 21v-6" />
  <path d="M13 18h6" />
  <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
  <path d="M2 20c0-3.313 2.687-6 6-6h2" />
</svg>

