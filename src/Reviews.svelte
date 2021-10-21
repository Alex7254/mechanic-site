<script>
  import PistonHeader from "./PistonHeader.svelte";
  import Review from "./Review.svelte";
</script>

<PistonHeader title="Reviews" />
<div class="reviews-container">
  <Review reviewerName="Alex Garcia" rating="4.2" />
  <Review rating="3.5" />
  <Review rating="4.8" />
</div>

<style>
  .reviews-container {
    /* height: 25rem; */
    padding: 2rem 8%;
    /* background-color: blanchedalmond; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
</style>
