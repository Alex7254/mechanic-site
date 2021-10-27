<script>
  import PistonHeader from "./PistonHeader.svelte";
  import Service from "./Service.svelte";
</script>

<section class="services d-flex-nw">
  <PistonHeader title="How We Can Help" />
  <div class="services__grid">
    <Service serviceTitle="CEL Diagnosis" serviceIcon="/assets/engine.svg" />
    <Service serviceTitle="Smog Check" serviceIcon="assets/exhaust.svg" />
    <Service serviceTitle="Brake Repairs" serviceIcon="assets/brakes.svg" />
    <Service serviceTitle="Oil Change" serviceIcon="assets/oil.svg" />
  </div>
  <div class="diagonal-button">
    <span class="button-slanted-content">More Services</span>
  </div>
</section>

<style>
  .services {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2rem 8%;
    max-width: 120rem;
    margin: auto;
  }
  .services__grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    height: 36rem;
  }

  /* Add with to button to fit content on this section of website */
  .diagonal-button {
    width: 12rem;
    margin: 4rem 0;
  }

  /* Extra large devices less than 1440px) */
  /* @media only screen and (max-width: 90rem) {
    .services {
      flex-wrap: nowrap;
    }
  } */
</style>
