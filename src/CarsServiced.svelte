<script>
  import PistonHeader from "./PistonHeader.svelte";
  import Service from "./Service.svelte";
</script>

<section class="cars-serviced" id="cars">
  <PistonHeader title="Brands We Service" />
  <div class="cars-serviced__gallery">
    <img
      class="cars-serviced__logo img-padding-bottom"
      src="/assets/volkswagen.png"
      alt=""
    />
    <img class="cars-serviced__logo" src="/assets/honda.png" alt="" />
    <img class="cars-serviced__logo" src="/assets/ford.png" alt="" />
    <img class="cars-serviced__logo" src="/assets/nissan.png" alt="" />
    <img class="cars-serviced__logo" src="/assets/dodge.png" alt="" />
    <img class="cars-serviced__logo" src="/assets/subaru.png" alt="" />
  </div>
</section>

<style>
  .cars-serviced {
    max-width: 120rem;
    padding: 2rem 8%;
    margin: auto;
  }
  .cars-serviced__gallery {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  .cars-serviced__logo {
    width: 6rem;
    height: 6rem;
    margin: 1.25rem;
    display: inline-block;
    filter: grayscale(100%);
    transition: all 0.4s ease-in-out;
  }

  .cars-serviced__logo:hover {
    filter: grayscale(0%);
  }
</style>
