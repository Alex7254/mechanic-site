<script>
  import PistonHeader from "./PistonHeader.svelte";
  import Service from "./Service.svelte";
</script>

<style>
  #gallery-container {
    /* background-color: lightslategray; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem 8%;
  }

  img {
    height: 8rem;
    display: inline-block;
    border-bottom: solid 2px white;
    /* background-color: cornflowerblue; */
  }

  img:hover {
    border-bottom: solid 2px red;
    transition: all 0.6s ease-in-out;
  }

  #volkswagen-img {
    padding-bottom: 1rem;
    height: 6.5rem;
  }
</style>

<PistonHeader title="Brands We Service" />
<div id="gallery-container">
  <img src="/assets/volkswagen.png" alt="" id="volkswagen-img" />
  <img src="/assets/honda.png" alt="" />
  <img src="/assets/ford.png" alt="" />
  <img src="/assets/nissan.png" alt="" />
  <img src="/assets/dodge.png" alt="" />
  <img src="/assets/subaru.png" alt="" />
</div>
