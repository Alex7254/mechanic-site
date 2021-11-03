<script>
  export let serviceIcon = "/assets/brakes.svg";
  export let serviceTitle = "Service Title";
  export let serviceText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatum, harum tempora quaerat iusto perspiciatis commodi accusamus similique.";
</script>

<div class="service">
  <div class="service__icon-container">
    <img class="service__icon " src={serviceIcon} alt="" />
  </div>
  <div class="service__body">
    <h1 class="service__title">{serviceTitle}</h1>
    <p class="service__text">
      {serviceText}
    </p>
  </div>
</div>

<style>
  .service {
    border-radius: 5px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    padding: 2rem;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
    cursor: default;
    transition: all 0.3s ease-in-out;
    height: 16rem;
    width: 49%;
    background-color: #033675;
    position: relative;
  }

  .service:hover {
    box-shadow: 0.625rem 0.625rem 0px 0px rgba(239, 35, 60, 1);
    -webkit-box-shadow: 0.625rem 0.625rem 0px 0px rgba(239, 35, 60, 1);
    -moz-box-shadow: 0.625rem 0.625rem 0px 0px rgba(239, 35, 60, 1);
    transform: scale(1.012);
  }

  .service__icon-container {
    width: 3.2rem;
    height: 3.2rem;
    margin-bottom: 1rem;
    display: grid;
    place-items: center;
  }

  .service__body {
    color: white;
  }

  .service__title {
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: 1.5px;
  }

  .service__text {
    font-size: 0.8rem;
    overflow: hidden;
    color: white;
    opacity: 0.65;
  }

  /* Extra large devices less than 1060px) */
  @media only screen and (max-width: 66.313rem) {
    .service__icon-container {
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 1rem;
      display: grid;
      place-items: center;
    }
    .service__title {
      font-size: 1.3rem;
      font-weight: 700;
      letter-spacing: 1.5px;
    }
  }
</style>
