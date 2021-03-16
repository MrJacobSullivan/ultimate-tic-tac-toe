<script>
  export let large = false
  let size = large ? 15 : 5
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="{size}rem"
  height="{size}rem"
  version="1.1"
>
  <line x1="15%" y1="15%" x2="85%" y2="85%" stroke-width="15%" class="mark" />
  <line x1="15%" y1="85%" x2="85%" y2="15%" stroke-width="15%" class="mark" />
</svg>
