<script>
  export let serviceIcon = "/assets/brakes.svg";
  export let serviceTitle = "Service Title";
  export let serviceSummary =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatum, harum tempora quaerat iusto perspiciatis commodi accusamus similique. Quod nemo repudiandae repellendus earum veniam quaerat dolorum laboriosam accusamus?";
</script>

<div class="service">
  <div class="icon-container">
    <img src={serviceIcon} alt="" />
  </div>
  <div class="service-summary">
    <h1>{serviceTitle}</h1>
    <p>
      {serviceSummary}
    </p>
  </div>
</div>

<style>
  .service {
    background-color: #034391;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    overflow: hidden;
    cursor: default;
    transition: all 0.3s ease-in-out;
  }

  .service:hover {
    box-shadow: 0.625rem 0.625rem 0px 0px rgba(239, 35, 60, 1);
    -webkit-box-shadow: 0.625rem 0.625rem 0px 0px rgba(239, 35, 60, 1);
    -moz-box-shadow: 0.625rem 0.625rem 0px 0px rgba(239, 35, 60, 1);
    transform: scale(1.012);
  }

  .icon-container {
    display: block;
    margin: auto;
    height: 10rem;
    padding: 2rem;
  }

  img {
    height: 100%;
  }

  .service-summary {
    height: 100%;
    margin: auto;
    color: white;
    background-color: #033675;
    padding: 2rem;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: 1.5px;
  }

  p {
    font-size: 0.8rem;
    width: 75%;
    /* background-color: red; */
    height: 75%;
    padding: 0.9rem 0;
    overflow: hidden;
    color: white;
    opacity: 0.7;
  }
</style>
