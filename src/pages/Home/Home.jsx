import Carousel from "./components/Carousel/Carousel";
import WhyBuildHabits from "./components/WhyBuildHabits";
import LatestHabits from "./components/LatestHabits";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <section className="max-w-11/12 py-10 mt-30 mx-auto">
        <Carousel />
      </section>

      <section className="max-w-7xl mx-auto my-5 md:my-10 py-10 px-4 sm:px-6">
        <LatestHabits />
      </section>

      <section>
        <WhyBuildHabits />
      </section>
    </div>
  );
};

export default Home;
