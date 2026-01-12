import React from "react";
import type { DailyForecast } from "../types/weather";

interface WeatherCardProps {
  data: DailyForecast;
  unit: "C" | "F";
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, unit }) => {
  const formatTemp = (temp: number) =>
    Math.round(unit === "C" ? temp : (temp * 9) / 5 + 32);
  const getDayName = (date: number) => {
    return new Date(date * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl min-w-[120px] shadow-lg transform transition-transform hover:scale-105">
      <p className="text-slate-700 dark:text-white font-semibold mb-2">
        {getDayName(data.date)}
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        className="w-16 h-16 drop-shadow-md"
      />
      <div className="flex space-x-2 mt-2">
        <span className="text-slate-800 dark:text-white font-bold">
          {formatTemp(data.temp_max)}°
        </span>
        <span className="text-slate-600 dark:text-white/60 font-medium">
          {formatTemp(data.temp_min)}°
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
