import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./keen-styles.css";
import Arrow from "./Arrow";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }

        slider.on("created", () => {
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);

        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });

        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });

        return () => {
          clearNextTimeout();
        };
      },
    ],
  );

  useEffect(() => {
    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
    };
  }, [instanceRef]);

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide1">
            <div className="slide-content">
              <h3>Build Better Habits</h3>
              <p>
                Start your journey to a better you with daily habit tracking
              </p>
            </div>
          </div>
          <div className="keen-slider__slide number-slide2">
            <div className="slide-content">
              <h3>Track Your Progress</h3>
              <p>Monitor streaks and see your consistency grow over time</p>
            </div>
          </div>
          <div className="keen-slider__slide number-slide3">
            <div className="slide-content">
              <h3>Join Our Community</h3>
              <p>Get inspired by others and share your success stories</p>
            </div>
          </div>
          <div className="keen-slider__slide number-slide4">
            <div className="slide-content">
              <h3>Stay Motivated</h3>
              <p>Receive reminders and celebrate your milestones</p>
            </div>
          </div>
          <div className="keen-slider__slide number-slide5">
            <div className="slide-content">
              <h3>Custom Categories</h3>
              <p>Organize habits by morning, work, fitness, and more</p>
            </div>
          </div>
          <div className="keen-slider__slide number-slide6">
            <div className="slide-content">
              <h3>Visual Analytics</h3>
              <p>See your progress with beautiful charts and insights</p>
            </div>
          </div>
        </div>

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              disabled={false}
            />
            <Arrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              disabled={false}
            />
          </>
        )}
      </div>

      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={`dot ${currentSlide === idx ? " active" : ""}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Carousel;
