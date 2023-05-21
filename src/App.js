import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "./config";
import { BsWater, BsThermometer, BsEye } from "react-icons/bs";
import WeatherIcon from "./components/weatherIcon";
import WeatherData from "./components/weatherData";
import "../src/App.css";

import { IoMdSearch, IoIosAirplane } from "react-icons/io";
import { RiCloudFill } from "react-icons/ri";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Delhi");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    if (inputValue === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    setInputValue("");
    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&q=${location}&units=metric&appid=${API_KEY}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 85);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
        <ImSpinner8 className="text-5xl animate-spin text-white text-center" />
      </div>
    );
  }

  const date = new Date();

  let bgColor;
  if (data) {
    switch (data.weather[0].main) {
      case "Clear":
        bgColor = "bg-sunny"; // replace with your class for sunny weather
        break;
      case "Clouds":
        bgColor = "bg-cloudy"; // replace with your class for cloudy weather
        break;
      case "Rain":
        bgColor = "bg-rainy"; // replace with your class for rainy weather
        break;
      case "Snow":
        bgColor = "bg-snowy"; // replace with your class for snowy weather
        break;
      //... and so on for other weather conditions
      default:
        bgColor = "bg-default"; // replace with your default class
    }
  } else {
    bgColor = "bg-loading"; // replace with your class for loading state
  }
  return (
    <div
      className={`w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0 ${bgColor}`}
    >
      {errorMsg && (
        <div className="w-full max-w-screen-lg text-4xl text-white text-center font-bold uppercase fixed top-0 left-0 z-50 mt-10">
          <div className="bg-red-500 py-4 px-8 rounded absolute top-0 left-1/2 transform -translate-x-1/2">
            {errorMsg.response.data.message}!
          </div>
        </div>
      )}

      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 mt-10 w-full max-w-screen-lg rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="mb-4 h-full relative flex items-center justify-between p-2">
          <input
            onChange={handleInput}
            className="flex-1 bg-transparent outline-none text-center px-2 py-1 sm:py-2"
            type="text"
            placeholder="Search By City or Country or Zip Code"
            value={inputValue}
          />
          <button
            onClick={handleSubmit}
            className="rounded-full flex justify-center items-center transition bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          >
            <IoMdSearch className="text-2xl" />
          </button>
        </div>
      </form>

      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <ImSpinner8 className="text-5xl animate-spin text-white text-center" />
        </div>
      ) : (
        data && (
          <div className="w-full max-w-screen-lg bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6 lg:px-12 lg:py-20 lg:flex lg:justify-between">
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
                    <div className="text-[5rem] leading-none font-light ml-0 sm:text-[4rem] md:text-[6rem]">
                      {parseInt(data.main.temp)}
                    </div>
                    <div className="text-[5rem] sm:text-[4rem] md:text-[6rem]">
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                  <div className="capitalize text-center text-3xl">
                    {data.weather[0]?.description}
                  </div>
                </div>
              </div>
              <div className="max-w-[378px] mx-auto lg:mx-0 lg:flex lg:flex-col lg:gap-y-6">
                <div className="lg:flex lg:justify-between mb-[1rem] ml-[1rem]">
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

                <div className="lg:flex lg:justify-between mb-[1rem] ml-[1rem] ">
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

                <div className="lg:flex lg:justify-between mb-[1rem] ml-[1rem]">
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
                <div className="lg:flex lg:justify-between mb-[1rem] ml-[1rem]">
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
        )
      )}
    </div>
  );
};

export default App;