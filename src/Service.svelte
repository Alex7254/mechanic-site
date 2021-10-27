<script>
  export let serviceIcon = "/assets/brakes.svg";
  export let serviceTitle = "Service Title";
  export let serviceText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatum, harum tempora quaerat iusto perspiciatis commodi accusamus similique. Quod nemo repudiandae repellendus earum veniam quaerat dolorum laboriosam accusamus?";
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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: default;
    transition: all 0.3s ease-in-out;
    height: 14.5rem;
    width: 48%;
    background-color: #033675;
  }

  .service:hover {
    box-shadow: 0.625rem 0.625rem 0px 0px rgba(239, 35, 60, 1);
    -webkit-box-shadow: 0.625rem 0.625rem 0px 0px rgba(239, 35, 60, 1);
    -moz-box-shadow: 0.625rem 0.625rem 0px 0px rgba(239, 35, 60, 1);
    transform: scale(1.012);
  }

  .service__icon-container {
    display: block;
    margin: auto;
    min-width: 10rem;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: #034391;
  }

  .service__icon {
    height: 6rem;
  }

  .service__body {
    padding: 2.5rem 5%;
    height: 100%;
    color: white;
  }

  .service__title {
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: 1.5px;
  }

  .service__text {
    font-size: 0.8rem;
    margin-top: 0.9rem;
    overflow: hidden;
    color: white;
    opacity: 0.7;
  }

  /* Extra large devices less than 1440px) */
  @media only screen and (max-width: 90rem) {
    .service__title {
      font-size: 1.3rem;
    }

    .service__text {
      font-size: 0.8rem;
    }
  }
</style>
