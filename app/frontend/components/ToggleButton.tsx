import React from "react";

type ToggleOption = {
    label: string;
    value: string;
};

type ToggleButtonProps = {
    options: ToggleOption[];
    value: string;
    onChange: (newValue: string) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ options, value, onChange }) => {
    return (
        <div className="toggle-button">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={option.value === value ? "active" : ""}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default ToggleButton;
