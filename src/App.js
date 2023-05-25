import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "./config";
import SearchForm from "./components/searchForm";
import WeatherCard from "./components/weatherCard";
import ForecastCard from "./components/forestCard";
import "../src/App.css";
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
        setErrorMsg(err.message);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [errorMsg]);

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

  if (!data) {
    return (
      <div className={`w-full h-screen ${bgColor} bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0`}>
        <ImSpinner8 className="text-5xl animate-spin text-white text-center" />
      </div>
    );
  }

  return (
    <div className={`w-full h-screen ${bgColor} bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0`}>
      {errorMsg && (
        <div className="w-full max-w-screen-lg text-3xl text-white text-center font-bold uppercase fixed top-0 left-0 z-50 mt-6">
          <div className="bg-red-500 py-2 px-6 rounded absolute top-0 left-1/2 transform -translate-x-1/2">
            {errorMsg}!
          </div>
        </div>
      )}

      <SearchForm
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        inputValue={inputValue}
        showSearchButton={showSearchButton}
        handleSearchButton={handleSearchButton}
      />

      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <ImSpinner8 className="text-5xl animate-spin text-white text-center" />
        </div>
      ) : (
        <WeatherCard
          data={data}
          handleForecast={handleForecast}
          date={date}
        />
      )}

      {forecastData && (
        <div className="max-w-full text-sm sm:text-base md:text-lg min-h-[500px] text-white bg-black backdrop-blur-[32px] rounded-[32px] p-4 sm:p-6 md:p-8 lg:px-12 lg:py-20 flex flex-wrap justify-center items-center">
          {forecastData.list
            .filter((_, i) => i % 2 === 0)
            .slice(0, 10)
            .map((day, index) => (
              <ForecastCard key={index} day={day} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
