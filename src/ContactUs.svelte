<script>
  import PistonHeader from "./PistonHeader.svelte";
  import Map from "./Map.svelte";
  // import {GoogleMap} from "@beyonk/svelte-googlemaps";
</script>

<style>
  section {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    flex-direction: row;
    padding: 1rem 8%;
  }
  div {
    height: 22rem;
    width: 50vw;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    flex-direction: column;
    color: white;
    padding: 2rem 4rem;
    border-radius: 10px 0 0 10px;
  }
  p {
    font-size: 1.2rem;
    font-weight: 200;
    letter-spacing: 1.3px;
  }
  span {
    font-weight: 700;
  }
</style>

<PistonHeader title="Contact Us" />

<section>
  <div class="blue-gradient">
    <p>
      <span>Phone:</span>
      (831)012-3456
    </p>
    <p>
      <span>Monday-Friday:</span>
      9:30am-5:00pm
    </p>
    <p>
      <span>Saturday:</span>
      9:30am-3:00pm
    </p>
    <p>
      <span>
        123 Union St
        <br />
        Watsonville, CA 95076
      </span>
    </p>
  </div>
  <Map />
</section>
