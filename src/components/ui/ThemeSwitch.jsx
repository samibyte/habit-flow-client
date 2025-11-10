import React from "react";
import styled from "styled-components";
import ThemeContext from "../../contexts/theme/ThemeContext";

const ThemeSwitch = ({ onToggle }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const handleToggle = () => {
    toggleTheme(!theme);
    if (onToggle) onToggle();
  };

  const isLightTheme = theme === "habitflow-light";

  return (
    <StyledWrapper>
      <label htmlFor="switch" className="switch">
        <input
          id="switch"
          type="checkbox"
          checked={isLightTheme}
          onChange={handleToggle}
        />
        <span className="slider" />
        <span className="decoration" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 14px;
    position: relative;
    display: inline-block;
    width: 2.8em;
    height: 1.6em;
    cursor: pointer;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    --background: #20262c;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background);
    transition: 0.5s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.1em;
    width: 1.1em;
    border-radius: 50%;
    left: 10%;
    bottom: 15%;
    box-shadow:
      inset 6px -3px 0px 0px #ececd9,
      -3px 1px 3px 0px #dadada;
    background: var(--background);
    transition: 0.5s;
  }

  .decoration {
    position: absolute;
    content: "";
    height: 1.5px;
    width: 1.5px;
    border-radius: 50%;
    right: 20%;
    top: 15%;
    background: #e5f041e6;
    backdrop-filter: blur(10px);
    transition: all 0.5s;
    box-shadow:
      -5px 8px 0 #e5f041e6,
      6px 12px 0 #e5f041e6,
      -13px 1px 0 #e5f041e6,
      -16px 8px 0 #e5f041e6,
      -5px 18px 0 #e5f041e6,
      -12px 20px 0 #e5f041e6;
  }

  input:checked ~ .decoration {
    transform: translateX(-16px);
    width: 5px;
    height: 5px;
    background: white;
    box-shadow:
      -8px 0 0 white,
      /* Reduced from -10px */ -4px 0 0 1px white,
      /* Reduced values */ 3px 10px 0 0.6px white,
      /* Reduced values */ 1px 12px 0 white,
      /* Reduced values */ 6px 12px 0 white; /* Reduced values */
  }

  input:checked + .slider {
    background-color: #5494de;
  }

  input:checked + .slider:before {
    transform: translateX(100%);
    box-shadow:
      inset 12px -3px 0px 12px #efdf2b,
      0 0 8px 0px #efdf2b;
  }
`;

export default ThemeSwitch;
