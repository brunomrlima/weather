import React from "react";
import { TemperatureToggleProps } from "../../types";

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ value, onChange }) => {
    return (
        <div className="toggle-button">
            <button
                type="button"
                className={value === "c" ? "active" : ""}
                onClick={() => onChange("c")}
            >
                °C
            </button>
            <button
                type="button"
                className={value === "f" ? "active" : ""}
                onClick={() => onChange("f")}
            >
                °F
            </button>
        </div>
    );
};

export default TemperatureToggle;
