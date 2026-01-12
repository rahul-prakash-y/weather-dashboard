import React from "react";
import type { CurrentWeatherData } from "../types/weather";
import { Sparkles } from "lucide-react";

interface WeatherReportProps {
  data: CurrentWeatherData;
  unit: "C" | "F";
}

const WeatherReport: React.FC<WeatherReportProps> = ({ data, unit }) => {
  const formatTemp = (temp: number) =>
    Math.round(unit === "C" ? temp : (temp * 9) / 5 + 32);

  const getTemperatureDescription = (temp: number, unit: "C" | "F") => {
    const tempC = unit === "C" ? temp : ((temp - 32) * 5) / 9;
    if (tempC < 0) return "freezing";
    if (tempC < 10) return "chilly";
    if (tempC < 20) return "mild";
    if (tempC < 30) return "warm";
    return "hot";
  };

  const getWindDescription = (speed: number) => {
    if (speed < 2) return "calm";
    if (speed < 5) return "breezy";
    if (speed < 10) return "windy";
    return "blustery";
  };

  const description = data.weather[0].description;
  const tempDesc = getTemperatureDescription(data.main.temp, "C"); // API always returns metric, convert for display only
  const windDesc = getWindDescription(data.wind.speed);

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 p-6 bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg animate-fade-in-up">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-500/20 rounded-full text-blue-600 dark:text-blue-300">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            Live Report
          </h3>
          <p className="text-slate-700 dark:text-blue-100/90 leading-relaxed text-lg">
            Currently in{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {data.name}
            </span>
            , expect{" "}
            <span className="font-medium text-blue-600 dark:text-blue-300">
              {description}
            </span>{" "}
            conditions. It feels <span className="font-medium">{tempDesc}</span>{" "}
            outside with a temperature of{" "}
            <span className="font-bold">
              {formatTemp(data.main.temp)}°{unit}
            </span>
            . Conditions are <span className="italic">{windDesc}</span> with
            winds at {data.wind.speed} m/s.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherReport;
