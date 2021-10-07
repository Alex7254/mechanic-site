<script>
  import PistonHeader from "./PistonHeader.svelte";
  import Service from "./Service.svelte";
</script>

<section class="cars-serviced">
  <PistonHeader title="Brands We Service" />
  <div class="cars-serviced__gallery">
    <img class="cars-serviced__logo img-padding-bottom"src="/assets/volkswagen.png" alt=""/>
    <img class="cars-serviced__logo" src="/assets/honda.png" alt="" />
    <img class="cars-serviced__logo" src="/assets/ford.png" alt="" />
    <img class="cars-serviced__logo" src="/assets/nissan.png" alt="" />
    <img class="cars-serviced__logo" src="/assets/dodge.png" alt="" />
    <img class="cars-serviced__logo" src="/assets/subaru.png" alt="" />
  </div>
</section>

<style>
  .cars-serviced__gallery {
    /* background-color: lightslategray; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
  }

  .cars-serviced__logo {
    height: 8rem;
    display: inline-block;
    border-bottom: solid 2px white;
    /* background-color: cornflowerblue; */
  }

  .cars-serviced__logo:hover {
    border-bottom: solid 2px red;
    transition: all 0.6s ease-in-out;
  }

  .img-padding-bottom {
    padding-bottom: 1rem;
    height: 6.5rem;
  }
</style>
