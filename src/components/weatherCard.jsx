import React from "react";
import WeatherIcon from "./weatherIcon";
import WeatherData from "./weatherData";
import { TbTemperatureCelsius } from "react-icons/tb";
import { BsWater, BsThermometer, BsEye } from "react-icons/bs";
import { IoIosAirplane } from "react-icons/io";
import { RiCloudFill } from "react-icons/ri";

const WeatherCard = ({ data, handleForecast, date }) => {
  return (
    <div className="w-full max-w-6xl text-sm sm:text-base md:text-lg bg-black/20 min-h-[500px] text-white backdrop-blur-[32px] rounded-[32px] p-4 sm:p-6 md:p-8 lg:px-12 lg:py-20 flex flex-col md:flex-row space-x-4 justify-between">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center gap-x-5">
          <div className="card_top">
            <WeatherIcon weatherMain={data.weather[0].main} />
            <div>
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              <div>{date.toLocaleDateString()}</div>
            </div>
          </div>
          <div className="my-20 lg:my-0 lg:mx-10">
            <div className="flex justify-center items-center">
              <button
                className="text-[5rem] leading-none font-light ml-0 sm:text-[4rem] md:text-[6rem] bg-transparent border-none cursor-pointer"
                onClick={handleForecast}
              >
                {parseInt(data.main.temp)}
              </button>
              <div className="text-[5rem] sm:text-[4rem] md:text-[6rem]">
                <TbTemperatureCelsius />
              </div>
            </div>
            <div className="capitalize text-center text-2xl">
              {data.weather[0]?.description}
            </div>
          </div>
        </div>
        <div className="max-w-[378px] mx-auto lg:mx-0 lg:flex lg:flex-col lg:gap-y-8 transition-all duration-200 ease-in-out">
          <div className="lg:flex lg:justify-between mb-4 ml-4 transform transition-transform duration-200 hover:scale-105">
            <WeatherData
              title="Humidity"
              data={data.main.humidity}
              icon={BsWater}
              suffix="%"
            />
            <WeatherData
              title="Pressure"
              data={data.main.pressure}
              icon={BsThermometer}
              suffix={"hPa"}
            />
          </div>

          <div className="lg:flex lg:justify-between mb-4 ml-4 transform transition-transform duration-200 hover:scale-105">
            <WeatherData
              title="Visibility"
              data={data.visibility / 1000}
              icon={BsEye}
              suffix="km"
            />
            <WeatherData
              title="Feels Like"
              data={data.main.feels_like}
              icon={BsThermometer}
              unit="°C"
            />
          </div>

          <div className="lg:flex lg:justify-between mb-4 ml-4 transform transition-transform duration-200 hover:scale-105">
            <WeatherData
              title="Min Temp"
              data={`${data.main.temp_min}°C`}
              icon={BsThermometer}
              unit="°C"
            />
            <WeatherData
              title="Max Temp"
              data={` ${data.main.temp_max}°C`}
              icon={BsThermometer}
              unit="°C"
            />
          </div>

          <div className="lg:flex lg:justify-between mb-4 ml-4 transform transition-transform duration-200 hover:scale-105">
            <WeatherData
              title="Wind Speed"
              data={data.wind.speed}
              icon={IoIosAirplane}
              suffix="m/s"
            />
            <WeatherData
              title="Clouds"
              data={data.clouds.all}
              icon={RiCloudFill}
              suffix="%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
