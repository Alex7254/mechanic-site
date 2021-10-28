<script>
  import PistonHeader from "./PistonHeader.svelte";
  import Map from "./Map.svelte";
  // import {GoogleMap} from "@beyonk/svelte-googlemaps";
</script>

<section class="contact-us" id="contact-us">
  <PistonHeader title="Contact Us" />
  <div class="contact-us__container d-flex-nw">
    <div class="contact-us__details blue-gradient">
      <div class="contact__hours">
        <p>
          <b>Monday-Friday:</b>
          9:30am-5:00pm
        </p>
        <p>
          <b>Saturday:</b>
          9:30am-3:00pm
        </p>
      </div>
      <p class="contact__phone">
        <b>Phone:</b>
        (831)012-3456
      </p>
      <p class="contact__address">
        123 W. Union St
        <br />
        Watsonville, CA 95076
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
    height: 30rem;
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    flex-direction: column;
    color: white;
    padding: 2rem 5rem;
    border-radius: 10px 0 0 10px;
    font-size: 1.3rem;
    letter-spacing: 1.3px;
  }

  /* Extra large devices less than 1440px) */
  @media only screen and (max-width: 90rem) {
    .contact-us__details {
      font-size: 1.15rem;
      padding: 1rem 5%;
    }
  }
</style>
