import { useState, useEffect, useCallback } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./keen-styles.css";
import Arrow from "./Arrow";

import runnerStart from "./../../../../assets/illustrations/runner-start.svg";
import activityTracker from "./../../../../assets/illustrations/activity-tracker.svg";
import community from "./../../../../assets/illustrations/community.svg";
import completing from "./../../../../assets/illustrations/completing.svg";
import motivation from "./../../../../assets/illustrations/motivation.svg";
import analyticsSetup from "./../../../../assets/illustrations/analytics-setup.svg";
import timeManagement from "./../../../../assets/illustrations/time-management.svg";
import contentStructure from "./../../../../assets/illustrations/content-structure.svg";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const slides = [
    {
      image: runnerStart,
      title: "Start Your Journey",
      description:
        "Begin building lasting habits with our intuitive daily tracker",
    },
    {
      image: activityTracker,
      title: "Track Your Progress",
      description: "Monitor streaks and see your consistency grow over time",
    },
    {
      image: community,
      title: "Grow Together",
      description: "Connect with like-minded people and share your progress",
    },
    {
      image: motivation,
      title: "Stay Inspired",
      description: "Get personalized reminders and celebrate every achievement",
    },
    {
      image: contentStructure,
      title: "Custom Categories",
      description: "Organize habits by morning, work, fitness, and more",
    },
    {
      image: completing,
      title: "Achieve Completion",
      description: "Mark habits as done and build your success streak",
    },
    {
      image: timeManagement,
      title: "Smart Time Management",
      description: "Plan your habits efficiently and make the most of your day",
    },
    {
      image: analyticsSetup,
      title: "Visual Analytics",
      description: "See your progress with beautiful charts and insights",
    },
  ];

  const autoPlayPlugin = useCallback((slider) => {
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
  }, []);

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
    [autoPlayPlugin],
  );

  useEffect(() => {
    const currentInstance = instanceRef.current;

    return () => {
      if (currentInstance) {
        currentInstance.destroy();
      }
    };
  }, [instanceRef]);

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`keen-slider__slide number-slide${index + 1}`}
            >
              <div className="slide-content">
                <div className="text-container">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
                <div
                  className="image-container"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              </div>
            </div>
          ))}
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
