import React from "react";
import { ForecastProps } from "../types";

const Forecast: React.FC<ForecastProps> = ({ forecast, unit }) => {
    const displayTemp = (c: number, f: number) =>
        unit === "c" ? `${c}°C` : `${f}°F`;

    return (
        <>
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
        </>
    );
};

export default Forecast;
