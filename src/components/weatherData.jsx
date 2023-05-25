import React from 'react';
const WeatherData = ({ title, data, unit, icon: IconComponent, suffix }) => (
    <div className="flex text-sm sm:text-base md:text-lg flex-col md:flex-row items-center gap-4 md:gap-x-2">
      {/* Weather icon */}
      <div className="text-2xl md:text-20px">
        <IconComponent />
      </div>
      {/* Weather data */}
      <div className="flex flex-col md:flex-row items-center mr-[1rem]">
        <div className="md:w-32">{title}</div>
        <div className="flex items-center mt-2 md:mt-0">
          <div className="text-xl md:text-1xl">{parseInt(data)}</div>
          {unit && <span className="ml-1">{unit}</span>}
          {suffix && <span className="ml-1">{suffix}</span>}
        </div>
      </div>
    </div>
  );
  
export default WeatherData;
