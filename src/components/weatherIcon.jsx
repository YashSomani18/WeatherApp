import React from 'react';
import {
  IoMdSunny,
  IoMdRainy,
  IoMdSnow,
  IoMdCloudy,
  IoMdThunderstorm,
} from "react-icons/io";
import { BsCloudHaze2Fill, BsDroplet } from "react-icons/bs"; // BsDroplet is just a placeholder, replace it with the actual icon for Mist

const WeatherIcon = ({ weatherMain }) => {
  let icon;
  let iconSize = "81px"; // Default icon size

  // Adjust the icon size based on the screen size
  if (window.innerWidth <= 768) {
    iconSize = "64px";
  }
  if (window.innerWidth <= 480) {
    iconSize = "48px";
  }

  switch (weatherMain) {
    case "Clouds":
      icon = <IoMdCloudy className="text-gray-500" />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill className="text-blue-300" />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-blue-500" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-yellow-500" />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm className="text-blue-800" />;
      break;
    case "Mist":
      icon = <BsDroplet className="text-gray-400" />; // Adjust the color and icon as per your preference
      break;
    default:
      break;
  }

  return <div className="text-[70px]" style={{ fontSize: iconSize }}>{icon}</div>;
};

export default WeatherIcon;
