import React from "react";

const ForecastCard = ({ day }) => {
  const date = new Date(day.dt * 1000);
  const iconId = day.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconId}.png`;

  return (
    <div className="flex flex-col items-center m-4 bg-white text-black p-4 rounded shadow">
      <h2>
        {date.toLocaleDateString()} {date.getHours()}:00
      </h2>
      <img src={iconUrl} alt="Weather icon" className="w-16 h-16" />
      <p>{day.weather[0].description}</p>
      <p>{day.main.temp}°C</p>
    </div>
  );
};

export default ForecastCard;
