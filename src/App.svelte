<script>
  import LandingArea from "./LandingArea.svelte";
  import MechanicServices from "./MechanicServices.svelte";
  import CarsServiced from "./CarsServiced.svelte";
  import AboutUs from "./AboutUs.svelte";
  import ContactUs from "./ContactUs.svelte";
  import Reviews from "./Reviews.svelte";
  import Footer from "./Footer.svelte";
  import Nav from "./Navigation.svelte";

  export let ready;
</script>

<style>

</style>

<svelte:head>
  <script
    defer
    async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBjIqKb_5XW208qw4oipWaGrXf3j8kroMI&callback=initMap">

  </script>
</svelte:head>
<Nav />
<LandingArea />
<MechanicServices />
<hr />
<CarsServiced />
<hr />
<AboutUs />
{#if ready}
  <ContactUs />
{/if}
<hr />
<Reviews />
<hr />
<Footer />
