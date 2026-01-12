import type { CurrentWeatherData, ForecastResponse } from '../types/weather';

export const mockCurrentWeather: CurrentWeatherData = {
    coord: { lon: -0.1257, lat: 51.5085 },
    weather: [
        {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
        }
    ],
    base: "stations",
    main: {
        temp: 20.5, // Celsius
        feels_like: 20.1,
        temp_min: 19.0,
        temp_max: 22.0,
        pressure: 1012,
        humidity: 53
    },
    visibility: 10000,
    wind: {
        speed: 3.6,
        deg: 350
    },
    clouds: {
        all: 1
    },
    dt: 1625662800,
    sys: {
        type: 2,
        id: 2006068,
        country: "GB",
        sunrise: 1625630606,
        sunset: 1625690184
    },
    timezone: 3600,
    id: 2643743,
    name: "London",
    cod: 200
};

export const mockForecast: ForecastResponse = {
    cod: "200",
    message: 0,
    cnt: 40,
    list: Array.from({ length: 40 }).map((_, i) => ({
        dt: 1625662800 + i * 10800, // 3 hour increments
        main: {
            temp: 18 + Math.sin(i) * 5,
            feels_like: 18 + Math.sin(i) * 5,
            temp_min: 15,
            temp_max: 25,
            pressure: 1012,
            sea_level: 1012,
            grnd_level: 1010,
            humidity: 50 + (i % 2) * 10,
            temp_kf: 0
        },
        weather: [
            {
                id: 800 + (i % 5 === 0 ? 500 : 0), // Mix of clear and rain
                main: i % 5 === 0 ? "Rain" : "Clear",
                description: i % 5 === 0 ? "light rain" : "clear sky",
                icon: i % 5 === 0 ? "10d" : "01d"
            }
        ],
        clouds: { all: 20 },
        wind: { speed: 4.0, deg: 200, gust: 6.0 },
        visibility: 10000,
        pop: 0,
        sys: { pod: "d" },
        dt_txt: new Date(1625662800000 + i * 10800000).toISOString().replace('T', ' ').substring(0, 19)
    })),
    city: {
        id: 2643743,
        name: "London",
        coord: { lat: 51.5085, lon: -0.1257 },
        country: "GB",
        population: 1000000,
        timezone: 3600,
        sunrise: 1625630606,
        sunset: 1625690184
    }
};
