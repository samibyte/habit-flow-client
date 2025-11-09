import Carousel from "../components/blocks/Carousel/Carousel";
import WhyBuildHabits from "../components/blocks/WhyBuildHabits";

const Home = () => {
  return (
    <div>
      <section className="max-w-11/12 mt-30 mx-auto">
        <Carousel />
      </section>
      <section>
        <WhyBuildHabits />
      </section>
    </div>
  );
};

export default Home;
