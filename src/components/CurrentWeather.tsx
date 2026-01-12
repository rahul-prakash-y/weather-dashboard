import React from "react";
import type { CurrentWeatherData } from "../types/weather";
import { Droplets, Wind, Thermometer, Eye } from "lucide-react";

interface CurrentWeatherProps {
  data: CurrentWeatherData;
  unit: "C" | "F";
  toggleUnit: () => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  data,
  unit,
  toggleUnit,
}) => {
  const formatTemp = (temp: number) =>
    Math.round(unit === "C" ? temp : (temp * 9) / 5 + 32);
  const formatDate = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-slate-800 dark:text-white p-6 rounded-3xl bg-white/30 dark:bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-1">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-lg text-slate-600 dark:text-blue-100 dark:opacity-80">
            {formatDate(data.dt)}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center bg-white/30 dark:bg-white/20 rounded-full px-2 py-1">
          <button
            onClick={toggleUnit}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
              unit === "C"
                ? "bg-white text-blue-900 shadow-sm"
                : "text-slate-600 dark:text-white hover:bg-white/10"
            }`}
          >
            °C
          </button>
          <button
            onClick={toggleUnit}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
              unit === "F"
                ? "bg-white text-blue-900 shadow-sm"
                : "text-slate-600 dark:text-white hover:bg-white/10"
            }`}
          >
            °F
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt={data.weather[0].description}
            className="w-32 h-32 -my-4 drop-shadow-lg"
          />
          <p className="text-xl capitalize font-medium">
            {data.weather[0].description}
          </p>
        </div>

        <div className="text-8xl font-bold tracking-tighter my-4 md:my-0">
          {formatTemp(data.main.temp)}°
        </div>

        <div className="bg-white/20 dark:bg-white/10 p-4 rounded-2xl md:w-48 text-center backdrop-blur-sm border border-white/10">
          <p className="text-sm opacity-70 mb-1">Feels Like</p>
          <p className="text-2xl font-semibold">
            {formatTemp(data.main.feels_like)}°
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <div className="bg-white/20 dark:bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center border border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-colors">
          <Droplets className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-300" />
          <p className="text-sm opacity-70">Humidity</p>
          <p className="text-lg font-bold">{data.main.humidity}%</p>
        </div>
        <div className="bg-white/20 dark:bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center border border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-colors">
          <Wind className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-300" />
          <p className="text-sm opacity-70">Wind Speed</p>
          <p className="text-lg font-bold">{data.wind.speed} m/s</p>
        </div>
        <div className="bg-white/20 dark:bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center border border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-colors">
          <Thermometer className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-300" />
          <p className="text-sm opacity-70">Pressure</p>
          <p className="text-lg font-bold">{data.main.pressure} hPa</p>
        </div>
        <div className="bg-white/20 dark:bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center border border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-colors">
          <Eye className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-300" />
          <p className="text-sm opacity-70">Visibility</p>
          <p className="text-lg font-bold">{data.visibility / 1000} km</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
