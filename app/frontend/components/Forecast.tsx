import React from "react";
import { ForecastProps } from "../types";
import { displayTemp } from "../utils/utils";

const Forecast: React.FC<ForecastProps> = ({forecast, unit}) => {
    return (
        <>
            <h3 className="forecast-heading">5-Day Forecast</h3>
            <div className="forecast-grid">
                { forecast.map((day) => (
                    <div className="forecast-day" key={ day.date }>
                        <p><strong>{ new Date(day.date).toLocaleDateString(undefined, {weekday: 'short'}) }</strong></p>
                        <img src={ day.icon_url } alt={ day.condition }/>
                        <p>{ day.condition }</p>
                        <p>{ displayTemp(day.high_c, day.high_f, unit) } / { displayTemp(day.low_c, day.low_f, unit) }</p>
                    </div>
                )) }
            </div>
        </>
    );
};

export default Forecast;
