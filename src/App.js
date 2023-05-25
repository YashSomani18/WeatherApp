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
  const [forecastData, setForecastData] = useState(null);
  const [showSearchButton, setShowSearchButton] = useState(false);

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

  const handleForecast = () => {
    setLoading(true);
    setErrorMsg("");
    setForecastData(null);
    setShowSearchButton(true);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`
      )
      .then((res) => {
        setLoading(false);
        setForecastData(res.data);
      })
      .catch((err) => {
        console.log(err.response); // add this line
        setLoading(false);
        setErrorMsg(err.message);
      });
  };

  const handleSearchButton = () => {
    setShowSearchButton(false);
  };

  const date = new Date();

  const weatherConditions = {
    Clear: "bg-sunny",
    Clouds: "bg-cloudy",
    Rain: "bg-rainy",
    Snow: "bg-snowy",
  };

  const bgColor = data
    ? weatherConditions[data.weather[0].main] || "bg-default"
    : "bg-loading";

  return (
    <div
      className={`w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0 ${bgColor}`}
    >
      {errorMsg && (
        <div className="w-full max-w-screen-lg text-3xl text-white text-center font-bold uppercase fixed top-0 left-0 z-50 mt-6">
          <div className="bg-red-500 py-2 px-6 rounded absolute top-0 left-1/2 transform -translate-x-1/2">
            {errorMsg.response.data.message}!
          </div>
        </div>
      )}

      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } py-2 bg-black bg-opacity-30 mt-10 w-full max-w-screen-lg rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="mb-4 h-full relative flex items-center justify-between p-2">
          <input
            onChange={handleInput}
            className="flex-1 bg-transparent outline-none text-center px-2 py-1 sm:py-2"
            type="text"
            placeholder="Search By City or Country or Zip Code"
            value={inputValue}
          />
          {showSearchButton && (
            <button
              onClick={handleSearchButton}
              className="rounded-full flex justify-center items-center transition-colors duration-300 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3"
            >
              <IoMdSearch className="text-3xl" />
            </button>
          )}
          {!showSearchButton && (
            <button
              onClick={handleSubmit}
              className="rounded-full flex justify-center items-center transition-colors duration-300 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3"
            >
              <IoMdSearch className="text-3xl" />
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <ImSpinner8 className="text-5xl animate-spin text-white text-center" />
        </div>
      ) : (
        data && (
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

                <div className="lg:flex lg:justify-between mb-4 ml-4 transition-all duration-200 ease-in-out">
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

                <div className="lg:flex lg:justify-between mb-4 ml-4 transition-all duration-200 ease-in-out">
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
                <div className="lg:flex lg:justify-between mb-4 ml-4 transition-all duration-200 ease-in-out">
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
      {forecastData && (
        <div className="max-w-full text-sm sm:text-base md:text-lg min-h-[500px] text-white bg-black backdrop-blur-[32px] rounded-[32px] p-4 sm:p-6 md:p-8 lg:px-12 lg:py-20 flex flex-wrap justify-center items-center">
          {forecastData.list
            .filter((_, i) => i % 2 === 0)
            .slice(0, 10)
            .map((day, index) => {
              const date = new Date(day.dt * 1000);
              const iconId = day.weather[0].icon;
              const iconUrl = `http://openweathermap.org/img/wn/${iconId}.png`;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center m-4 bg-white text-black p-4 rounded shadow"
                >
                  <h2>
                    {date.toLocaleDateString()} {date.getHours()}:00
                  </h2>
                  <img src={iconUrl} alt="Weather icon" className="w-16 h-16" />
                  <p>{day.weather[0].description}</p>
                  <p>{day.main.temp}°C</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default App;
