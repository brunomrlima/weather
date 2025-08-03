import React from "react";
import { HourlyData } from "../types";

type Props = {
    hourly: HourlyData[];
    unit: "c" | "f";
};

const HourlyForecast: React.FC<Props> = ({ hourly, unit }) => {
    const displayTemp = (c: number, f: number) =>
        unit === "c" ? `${c}°C` : `${f}°F`;

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
                            <p>{displayTemp(hour.temperature_c, hour.temperature_f)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyForecast;
