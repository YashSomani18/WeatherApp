import React from 'react';
import { IoMdSunny, IoMdRainy, IoMdSnow, IoMdCloudy, IoMdThunderstorm } from "react-icons/io";
import { BsCloudHaze2Fill, BsDroplet } from "react-icons/bs";

const WeatherIcon = ({ weatherMain }) => {
  const iconSize = getIconSize();

  const weatherConditions = {
    Clouds: <IoMdCloudy className="text-gray-500" />,
    Haze: <BsCloudHaze2Fill className="text-blue-300" />,
    Rain: <IoMdRainy className="text-blue-500" />,
    Clear: <IoMdSunny className="text-yellow-500" />,
    Snow: <IoMdSnow />,
    Thunderstorm: <IoMdThunderstorm className="text-blue-800" />,
    Mist: <BsDroplet className="text-gray-400" />, // Adjust the color and icon as per your preference
  };

  const icon = weatherConditions[weatherMain] || null;

  return <div className="weather-icon text-[70px]" style={{ fontSize: iconSize }}>{icon}</div>;
};

const getIconSize = () => {
  let iconSize = "81px"; 

  if (window.innerWidth <= 768) {
    iconSize = "64px";
  }
  if (window.innerWidth <= 480) {
    iconSize = "48px";
  }

  return iconSize;
};

export default WeatherIcon;
