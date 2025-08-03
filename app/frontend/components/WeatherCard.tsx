import React, { useState } from "react";
import ToggleButton from "./ToggleButton";
import Forecast from "./Forecast";
import CurrentWeather from "./CurrentWeather";
import { WeatherCardProps } from "../types";
import HourlyForecast from "./HourlyForecast";

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    const [unit, setUnit] = useState<"c" | "f">("c");

    const {
        location,
        region,
        country,
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

            <ToggleButton
                options={[
                    { label: "°C", value: "c" },
                    { label: "°F", value: "f" }
                ]}
                value={unit}
                onChange={(newValue) => setUnit(newValue as "c" | "f")}
            />
            <CurrentWeather weather={data.data} unit={unit} />
            <HourlyForecast hourly={data.data.hourly} unit={unit} />
            <Forecast forecast={forecast} unit={unit} />
        </div>
    );
};

export default WeatherCard;
