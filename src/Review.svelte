<script>
  import StarRating from "svelte-stars-rating";

  export let reviewerName = "Persons Name";
  export let reviewParagraph =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio veniamquasi iure doloremque enim dolore maxime omnis labore voluptate,reiciendis nesciunt! Labore itaque quod atque ipsam possimus dicta nihilpariatur. At odio vel accusamus accusantium?";
  export let rating = "3.5";

  let isIndicatorActive = false;
  let style = {
    styleStarWidth: 18,
    styleEmptyStarColor: "#d4d4d4",
    styleFullStarColor: "#ffd219",
  };
</script>

<div class="review blue-gradient">
  <StarRating {rating} {style} {isIndicatorActive} />
  <p>
    {reviewParagraph}
  </p>
  <h3>{reviewerName}</h3>
</div>

<style>
  .review {
    cursor: default;
    height: 24rem;
    width: 22rem;
    padding: 2rem;
    border-radius: 0.4rem;
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  h3 {
    letter-spacing: 1.5px;
  }
  p {
    font-weight: 200;
    font-size: 0.8rem;
    letter-spacing: 0.7px;
  }
</style>
