import React from "react";
import Tilt from "react-parallax-tilt";
import { colors, getTextColorClass } from "./colors";
import StatsSection from './StatsSection';

const Section = ({
  backgroundColor,
  titleColor,
  textColor,
  title,
  image,
  imagePosition,
  imageSize,
  text,
  text2,
  buttonText, 
  buttonBgColor,
  buttonTextColor,
  buttonLink,
  showStatsSection
}) => {
  const titleColorClass = getTextColorClass(colors[titleColor]);
  const textColorClass = getTextColorClass(colors[textColor]);
  const buttonTextColorClass = getTextColorClass(colors[buttonTextColor]); 

  return (
    <div className={`py-12 px-6`} style={{ backgroundColor: colors[backgroundColor] }}>
      <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-6 max-w-6xl mx-auto">
        {imagePosition === "left" && (
          <Tilt>
            <img
              src={image}
              alt="section"
              className="rounded-full"
              style={{ width: imageSize, height: imageSize}}
            />
          </Tilt>
        )}

        <div className="flex-1 text-center lg:text-left">
          <h1 className={`  font-bold tracking-tight ${titleColorClass}`}>
            {title}
          </h1>
          <h5 className={` ${textColorClass}`}>
            {text}
          </h5>
          <p className={`max-w-lg ${textColorClass}`}>
            {text2}
          </p>
          {buttonText && buttonLink && ( 
            <a href={buttonLink}>
              <button
                className={`mt-8 py-3 px-4 rounded ${buttonTextColorClass}`}
                style={{ backgroundColor: colors[buttonBgColor] }} 
              >
                {buttonText}
              </button>
            </a>
          )}
          {showStatsSection && <StatsSection />} 
        </div>

        {imagePosition === "right" && (
          <Tilt>
            <img
              src={image}
              alt="section"
              className="rounded-full"
              style={{ width: imageSize, height: imageSize }}
            />
          </Tilt>
        )}
      </div>
    </div>
  );
};

export default Section;