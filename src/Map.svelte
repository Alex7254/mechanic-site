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

<div class="map" bind:this={container} />

<style>
  .map {
    width: 60%;
    height: 30rem;
    /* height: 25rem; */
    border-radius: 0 0.625rem 0.625rem 0;
  }
</style>
