import { useState, useCallback, useEffect } from "react";
import type { CurrentWeatherData, ForecastResponse, DailyForecast } from "../types/weather";
import { mockCurrentWeather, mockForecast } from "../data/mockData";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

interface WeatherState {
    current: CurrentWeatherData | null;
    forecast: DailyForecast[] | null;
    loading: boolean;
    error: string | null;
}

export const useWeather = () => {
    const [weatherData, setWeatherData] = useState<WeatherState>({
        current: null,
        forecast: null,
        loading: false,
        error: null,
    });

    const processForecast = (list: ForecastResponse['list']): DailyForecast[] => {
        const dailyMap = new Map<string, { min: number; max: number; icon: string; description: string; count: number }>();

        list.forEach((item) => {
            const date = new Date(item.dt * 1000).toISOString().split('T')[0];
            const temp = item.main.temp;
            const existing = dailyMap.get(date);

            if (existing) {
                existing.min = Math.min(existing.min, temp);
                existing.max = Math.max(existing.max, temp);
                // prioritizing noonish icons? simplify: take noon or first
            } else {
                dailyMap.set(date, {
                    min: temp,
                    max: temp,
                    icon: item.weather[0].icon,
                    description: item.weather[0].description,
                    count: 1
                });
            }
        });

        // Convert map to array and take next 5 days
        return Array.from(dailyMap.entries())
            .slice(0, 5)
            .map(([dateStr, data]) => ({
                date: new Date(dateStr).getTime() / 1000,
                temp_min: data.min,
                temp_max: data.max,
                icon: data.icon,
                description: data.description
            }));
    };

    const fetchWeather = useCallback(async (query: string) => {
        setWeatherData(prev => ({ ...prev, loading: true, error: null }));

        try {
            if (!API_KEY) {
                // Simulate network delay for mock
                await new Promise(resolve => setTimeout(resolve, 800));
                console.warn("Using Mock Data (No API Key found)");
                setWeatherData({
                    current: { ...mockCurrentWeather, name: query || "London (Mock)" }, // overwrite name to pretend search worked
                    forecast: processForecast(mockForecast.list),
                    loading: false,
                    error: null,
                });
                return;
            }

            const [currentRes, forecastRes] = await Promise.all([
                fetch(`${BASE_URL}/weather?q=${query}&units=metric&appid=${API_KEY}`),
                fetch(`${BASE_URL}/forecast?q=${query}&units=metric&appid=${API_KEY}`)
            ]);

            if (!currentRes.ok || !forecastRes.ok) {
                throw new Error('City not found or API error');
            }

            const currentAndData = await currentRes.json();
            const forecastData = await forecastRes.json();

            setWeatherData({
                current: currentAndData,
                forecast: processForecast(forecastData.list),
                loading: false,
                error: null,
            });

        } catch (err) {
            setWeatherData(prev => ({
                ...prev,
                loading: false,
                error: err instanceof Error ? err.message : 'An unknown error occurred',
            }));
        }
    }, []);

    const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
        setWeatherData(prev => ({ ...prev, loading: true, error: null }));

        try {
            if (!API_KEY) {
                await new Promise(resolve => setTimeout(resolve, 800));
                setWeatherData({
                    current: { ...mockCurrentWeather, name: "Current Location (Mock)" },
                    forecast: processForecast(mockForecast.list),
                    loading: false,
                    error: null,
                });
                return;
            }

            const [currentRes, forecastRes] = await Promise.all([
                fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
                fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
            ]);

            if (!currentRes.ok || !forecastRes.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const currentAndData = await currentRes.json();
            const forecastData = await forecastRes.json();

            setWeatherData({
                current: currentAndData,
                forecast: processForecast(forecastData.list),
                loading: false,
                error: null,
            });

        } catch (err) {
            setWeatherData(prev => ({
                ...prev,
                loading: false,
                error: err instanceof Error ? err.message : 'An unknown error occurred',
            }));
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchWeather("London");
    }, [fetchWeather]);

    return { ...weatherData, fetchWeather, fetchWeatherByCoords };
};
