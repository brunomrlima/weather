import React from "react";
import { CurrentWeatherProps } from "../../types";
import { displayTemp } from "../../utils/utils";

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, unit }) => {
    const {
        condition,
        icon_url,
        temperature_c,
        temperature_f,
        feels_like_c,
        feels_like_f,
        last_updated,
        today
    } = weather;

    return (
        <div className="current-weather">
            <img src={icon_url} alt={condition} />
            <div>
                <p><strong>Condition:</strong> {condition}</p>
                <p><strong>Temperature:</strong> {displayTemp(temperature_c, temperature_f, unit)}</p>
                <p><strong>Feels Like:</strong> {displayTemp(feels_like_c, feels_like_f, unit)}</p>
                <p><strong>High / Low:</strong> {displayTemp(today.high_c, today.high_f, unit)} / {displayTemp(today.low_c, today.low_f, unit)}</p>
                <p><small>Last Updated: {last_updated}</small></p>
            </div>
        </div>
    );
};

export default CurrentWeather;
