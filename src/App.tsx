import { useState, useEffect, useMemo } from "react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import ForecastList from "./components/ForecastList";
import WeatherReport from "./components/WeatherReport";
import { Loader2, AlertCircle, Sun, Moon } from "lucide-react";

function App() {
  const {
    current,
    forecast,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoords,
  } = useWeather();
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [darkMode, setDarkMode] = useState(true);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (err) => {
          console.error("Location access denied", err);
          alert("Could not access location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const bgGradient = useMemo(() => {
    if (!current) return "from-blue-600 to-blue-900";

    const main = current.weather[0].main.toLowerCase();

    // Dynamic background map for Dark Mode
    const darkGradients: Record<string, string> = {
      clear: "from-blue-600 to-blue-900",
      clouds: "from-slate-600 to-slate-900",
      rain: "from-slate-800 to-slate-950",
      drizzle: "from-slate-700 to-slate-900",
      thunderstorm: "from-indigo-900 to-slate-950",
      snow: "from-blue-800 to-blue-950",
      mist: "from-gray-700 to-gray-900",
      default: "from-blue-900 to-purple-900",
    };

    // Dynamic background map for Light Mode
    const lightGradients: Record<string, string> = {
      clear: "from-blue-300 to-blue-500",
      clouds: "from-slate-300 to-slate-500",
      rain: "from-slate-400 to-slate-600",
      drizzle: "from-slate-300 to-slate-500",
      thunderstorm: "from-indigo-400 to-slate-600",
      snow: "from-blue-100 to-blue-300",
      mist: "from-gray-300 to-gray-500",
      default: "from-blue-400 to-purple-500",
    };

    const isNight = current.weather[0].icon.includes("n");
    const gradients = darkMode ? darkGradients : lightGradients;

    if (isNight && main === "clear" && darkMode) {
      return "from-slate-900 to-black";
    } else if (isNight && main === "clear" && !darkMode) {
      return "from-blue-200 to-indigo-300";
    } else {
      return gradients[main] || gradients.default;
    }
  }, [current, darkMode]);

  return (
    <div
      className={`min-h-screen transition-all duration-1000 bg-gradient-to-br ${bgGradient} flex flex-col items-center py-10 px-4`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors border border-white/20 shadow-lg text-white"
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      <header className="mb-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-2 tracking-tight drop-shadow-md">
          SkyCast
        </h1>
        <p className="text-white/80 drop-shadow-sm">Weather Dashboard</p>
      </header>

      <SearchBar
        onSearch={fetchWeather}
        onLocationClick={handleLocationClick}
      />

      {loading && (
        <div className="flex flex-col items-center justify-center mt-20 text-white">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="text-xl">Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center mt-20 text-white bg-red-500/20 backdrop-blur-md p-8 rounded-2xl border border-red-500/30">
          <AlertCircle className="w-12 h-12 mb-4 text-red-300" />
          <p className="text-lg font-medium">{error}</p>
          <button
            onClick={() => fetchWeather("London")}
            className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && current && forecast && (
        <div className="w-full max-w-4xl animate-fade-in">
          <CurrentWeather
            data={current}
            unit={unit}
            toggleUnit={() => setUnit((prev) => (prev === "C" ? "F" : "C"))}
          />
          <WeatherReport data={current} unit={unit} />
          <ForecastList forecast={forecast} unit={unit} />
        </div>
      )}
    </div>
  );
}

export default App;
