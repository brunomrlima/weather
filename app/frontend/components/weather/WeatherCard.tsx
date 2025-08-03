import React, { useState } from "react";
import DailyForecast from "./DailyForecast";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import TemperatureToggle from "./TemperatureToggle";
import { TempUnit, WeatherCardProps } from "../../types";

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
                    {data.data.from_cache ? "⚡ From Cache" : "🌐 Live Data"}
                </span>
                <div className="toggle-wrapper">
                    <TemperatureToggle value={unit} onChange={setUnit} />
                </div>
            </div>
            <CurrentWeather weather={data.data} unit={unit} />
            <HourlyForecast hourly={data.data.hourly} unit={unit} />
            <DailyForecast forecast={forecast} unit={unit} />
        </div>
    );
};

export default WeatherCard;
