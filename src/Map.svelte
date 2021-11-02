<script>
  let container;
  let map;
  let zoom = 14;
  let center = { lat: 37.3385, lng: -121.9534 };
  import { onMount } from "svelte";

  onMount(async () => {
    map = new google.maps.Map(container, {
      zoom,
      center,
      gestureHandling: "none",
      zoomControl: false,
    });
  });
</script>

<div class="map" bind:this={container} />

<style>
  .map {
    width: 100%;
    height: 30rem;
    /* height: 25rem; */
    border-radius: 0.625rem;
  }
</style>
