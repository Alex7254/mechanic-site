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

<svelte:head>
  <script
    defer
    async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhnRVZfDUED8k2cFQjT8FluYWed5qrzFo&callback=initMap">
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

<style></style>
