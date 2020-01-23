<script>
  export let serviceIcon = "/assets/brakes.svg";
  export let serviceTitle = "Service Title";
  export let serviceSummary = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatum, harum tempora quaerat iusto perspiciatis commodi accusamus similique. Quod nemo repudiandae repellendus earum veniam quaerat dolorum laboriosam accusamus? Et iusto veritatis necessitatibus id unde rerum voluptatibus perspiciatis quia explicabo quis, enim magni ad cum ipsam!";
</script>

<style>
  .service {
    background-color: #022d61;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    overflow: hidden;
    cursor: default;
  }

  .service:hover {
    -webkit-box-shadow: 10px 10px 15px -5px rgba(1, 25, 54, 0.47);
    -moz-box-shadow: 10px 10px 15px -5px rgba(1, 25, 54, 0.47);
    box-shadow: 10px 10px 15px -5px rgba(1, 25, 54, 0.47);
    transition: all 0.3s ease-in-out;
  }

  .icon-container {
    /* background-color: purple; */
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
    background-color: #011936;
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
