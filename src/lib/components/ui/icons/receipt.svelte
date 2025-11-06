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
  <path d="M4 3.5c0-.552.448-1 1-1h14c.552 0 1 .448 1 1V21l-3.5-1.75L13 21l-3.5-1.75L6 21 4 20Z" />
  <path d="M8 7h8" />
  <path d="M8 11h8" />
  <path d="M8 15h5" />
</svg>

