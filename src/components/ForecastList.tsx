import React from "react";
import type { DailyForecast } from "../types/weather";
import WeatherCard from "./WeatherCard";

interface ForecastListProps {
  forecast: DailyForecast[];
  unit: "C" | "F";
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast, unit }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-slate-800 dark:text-white/80 text-xl font-semibold mb-4 ml-2">
        5-Day Forecast
      </h3>
      <div className="flex overflow-x-auto pb-4 gap-4 px-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {forecast.map((item) => (
          <WeatherCard key={item.date} data={item} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
