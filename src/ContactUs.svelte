<script>
  import PistonHeader from "./PistonHeader.svelte";
  import Map from "./Map.svelte";
  // import {GoogleMap} from "@beyonk/svelte-googlemaps";
</script>

<section class="contact-us" id="contact-us">
  <PistonHeader title="Contact Us" />
  <div class="contact-us__container d-flex-nw">
    <div class="contact-us__details blue-gradient">
      <p>
        <b>Phone:</b>
        (831)012-3456
      </p>
      <div class="contact-us__details__hours">
        <p>
          <b>Monday-Friday:</b>
          9:30am-5:00pm
        </p>
        <p>
          <b>Saturday:</b>
          9:30am-3:00pm
        </p>
      </div>
      <p>
        <b>
          123 Union St
          <br />
          Watsonville, CA 95076
        </b>
      </p>
    </div>
    <Map />
  </div>
</section>

<style>
  .contact-us {
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    padding: 1rem 8%;
    max-width: 120rem;
    margin: auto;
  }
  .contact-us__details {
    height: 25rem;
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    flex-direction: column;
    color: white;
    padding: 2rem 4rem;
    border-radius: 10px 0 0 10px;
    font-size: 1.2rem;
    letter-spacing: 1.3px;
  }
</style>
