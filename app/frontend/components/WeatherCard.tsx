import React, { useState } from "react";
import ToggleButton from "./ToggleButton";
import Forecast from "./Forecast";
import CurrentWeather from "./CurrentWeather";
import { TempUnit, WeatherCardProps } from "../types";
import HourlyForecast from "./HourlyForecast";

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    const [unit, setUnit] = useState<TempUnit>("c");

    const {
        location,
        region,
        country,
        forecast,
    } = data.data;

    return (
        <div className="weather-card">
            <div className="weather-header">
                <h2>{location}, {region}, {country}</h2>
            </div>
            <div className="header-row">
                <span className="source-label">
                    {data.from_cache ? "⚡ From Cache" : "🌐 Live Data"}
                </span>
                <div className="toggle-wrapper">
                    <ToggleButton
                        options={[
                            { label: "°C", value: "c" },
                            { label: "°F", value: "f" }
                        ]}
                        value={unit}
                        onChange={(newValue) => setUnit(newValue as TempUnit)}
                    />
                </div>
            </div>
            <CurrentWeather weather={data.data} unit={unit} />
            <HourlyForecast hourly={data.data.hourly} unit={unit} />
            <Forecast forecast={forecast} unit={unit} />
        </div>
    );
};

export default WeatherCard;
