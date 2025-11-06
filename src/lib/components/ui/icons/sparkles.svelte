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
  <path d="M12 4 13.6 7.6 17.2 9.2 13.6 10.8 12 14.4 10.4 10.8 6.8 9.2 10.4 7.6Z" />
  <path d="M5 5 5.8 6.8 7.6 7.6 5.8 8.4 5 10.2 4.2 8.4 2.4 7.6 4.2 6.8Z" />
  <path d="M18.8 14.6 19.5 16.2 21.1 16.9 19.5 17.6 18.8 19.2 18.1 17.6 16.5 16.9 18.1 16.2Z" />
</svg>

