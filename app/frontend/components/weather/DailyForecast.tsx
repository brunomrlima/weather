import React from "react";
import { ForecastProps } from "../../types";
import { displayTemp } from "../../utils/utils";

const DailyForecast: React.FC<ForecastProps> = ({forecast, unit}) => {
    return (
        <>
            <h3 className="forecast-heading">5-Day Forecast</h3>
            <div className="forecast-grid">
                { forecast.map((day) => (
                    <div className="forecast-day" key={ day.date }>
                        <p><strong>{new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-US", { weekday: 'short', timeZone: 'UTC' })}</strong></p>
                        <img src={ day.icon_url } alt={ day.condition }/>
                        <p>{ day.condition }</p>
                        <p>{ displayTemp(day.high_c, day.high_f, unit) } / { displayTemp(day.low_c, day.low_f, unit) }</p>
                    </div>
                )) }
            </div>
        </>
    );
};

export default DailyForecast;
