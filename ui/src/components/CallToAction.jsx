import React from 'react';

const CallToAction = ({ buttonText, buttonLink }) => {
  return (
    <div className="relative overflow-hidden bg-white text-[var(--color-black)] py-20">
      {/* Background moving text */}
      <div className="absolute inset-0 flex items-center justify-start whitespace-nowrap">
        <div className="text-9xl font-bold opacity-5 animate-marquee">
          The best Online Platform for you and your family and friends
        </div>
        <div className="text-9xl font-bold opacity-5 animate-marquee2">
          The best Online Platform for you and your family and friends 
        </div>
      </div>
   
      <div className="relative z-10 text-center">
        <h2 className=" mb-6  font-bold">
          Online learning wherever and whenever
        </h2>
        {buttonText && buttonLink && (
          <a href={buttonLink} className="btn-wide py-3">
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default CallToAction;