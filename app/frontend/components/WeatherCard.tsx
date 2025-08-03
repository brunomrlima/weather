import React, { useState } from "react";

type ForecastDay = {
    date: string;
    condition: string;
    icon_url: string;
    high_c: number;
    low_c: number;
    high_f: number;
    low_f: number;
};

type WeatherData = {
    location: string;
    region: string;
    country: string;
    temperature_c: number;
    temperature_f: number;
    feels_like_c: number;
    feels_like_f: number;
    condition: string;
    icon_url: string;
    last_updated: string;
    today: {
        high_c: number;
        low_c: number;
        high_f: number;
        low_f: number;
    };
    forecast: ForecastDay[];
};

type WeatherCardProps = {
    data: {
        data: WeatherData;
        from_cache: boolean;
    };
};

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    const [unit, setUnit] = useState<"c" | "f">("c");

    const {
        location,
        region,
        country,
        temperature_c,
        temperature_f,
        feels_like_c,
        feels_like_f,
        condition,
        icon_url,
        last_updated,
        today,
        forecast,
    } = data.data;

    const displayTemp = (c: number, f: number) =>
        unit === "c" ? `${c}°C` : `${f}°F`;

    return (
        <div className="weather-card">
            <div className="weather-header">
                <h2>{location}, {region}, {country}</h2>
                <span className="source-label">
                  {data.from_cache ? "⚡ From Cache" : "🌐 Live Data"}
                </span>
            </div>

            <div className="unit-toggle">
                <button
                    type="button"
                    className={unit === "c" ? "active" : ""}
                    onClick={() => setUnit("c")}
                >
                    °C
                </button>
                <button
                    type="button"
                    className={unit === "f" ? "active" : ""}
                    onClick={() => setUnit("f")}
                >
                    °F
                </button>
            </div>

            <div className="current-weather">
                <img src={icon_url} alt={condition} />
                <div>
                    <p><strong>Condition:</strong> {condition}</p>
                    <p><strong>Temperature:</strong> {displayTemp(temperature_c, temperature_f)}</p>
                    <p><strong>Feels Like:</strong> {displayTemp(feels_like_c, feels_like_f)}</p>
                    <p><strong>High / Low:</strong> {displayTemp(today.high_c, today.high_f)} / {displayTemp(today.low_c, today.low_f)}</p>
                    <p><small>Last Updated: {last_updated}</small></p>
                </div>
            </div>

            <h3 className="forecast-heading">5-Day Forecast</h3>
            <div className="forecast-grid">
                {forecast.map((day) => (
                    <div className="forecast-day" key={day.date}>
                        <p><strong>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}</strong></p>
                        <img src={day.icon_url} alt={day.condition} />
                        <p>{day.condition}</p>
                        <p>{displayTemp(day.high_c, day.high_f)} / {displayTemp(day.low_c, day.low_f)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherCard;
