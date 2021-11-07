<script>
  import PistonHeader from "./PistonHeader.svelte";
  import Review from "./Review.svelte";
</script>

<div class="reviews">
  <PistonHeader title="Reviews" />
  <div class="reviews-container">
    <Review reviewerName="Alex Garcia" rating="4.2" />
    <Review rating="3.5" reviewerName="Sooz Garcia" />
    <Review rating="4.8" />
    <Review rating="4.8" />
    <Review rating="4.4" />
  </div>
</div>

<style>
  .reviews {
    padding: 1rem 8%;
    max-width: 120rem;
    margin: auto;
  }

  .reviews-container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;
  }
</style>
