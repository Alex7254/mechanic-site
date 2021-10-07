<script>
  let container;
  let map;
  let zoom = 9;
  let center = { lat: 36.9102, lng: -121.7569 };

  import { onMount } from "svelte";

  onMount(async () => {
    map = new google.maps.Map(container, {
      zoom,
      center,
    });
  });
</script>

<div class="full-screen" bind:this={container} />

<style>
  .full-screen {
    width: 50vw;
    height: 22rem;
    border-radius: 0 10px 10px 0;
  }
</style>
