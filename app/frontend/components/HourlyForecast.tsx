import React from "react";
import { displayTemp } from "../utils/utils";
import { HourlyForecastProps } from "../types";

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, unit }) => {
    return (
        <div className="hourly-forecast">
            <h3>Hourly Forecast</h3>
            <div className="hour-scroll">
                {hourly.map((hour) => {
                    const time = new Date(hour.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    });

                    return (
                        <div className="hour" key={hour.time}>
                            <p>{time}</p>
                            <img src={hour.icon_url} alt={hour.condition} />
                            <p>{displayTemp(hour.temperature_c, hour.temperature_f, unit)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyForecast;
