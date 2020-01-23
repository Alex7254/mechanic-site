<script>
  import PistonHeader from "./PistonHeader.svelte";
  import Service from "./Service.svelte";
</script>

<style>
section {
   display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;
}
  .services-grid {
    /* background-color: silver; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 12rem;
    padding: 2rem 8%;
    grid-gap: 3rem;
  }

  /* Add with to button to fit content on this section of website */
  .diagonal-button {
    width:12rem;
    margin: 4rem 0;
  }
</style>

<section>
  <PistonHeader title="How We Can Help" />
  <div class="services-grid">
    <Service serviceTitle="CEL Diagnosis" serviceIcon="/assets/engine.svg" />
    <Service serviceTitle="Smog Check" serviceIcon="assets/exhaust.svg" />
    <Service serviceTitle="Brake Repairs" serviceIcone="assets/brakes.svg" />
    <Service serviceTitle="Oil Change" serviceIcon="assets/oil.svg" />
  </div>
  <div class="diagonal-button">
    <span class="button-slanted-content">More Services</span>
  </div>
</section>
