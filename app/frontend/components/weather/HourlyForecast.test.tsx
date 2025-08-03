import React from "react";
import { render, screen } from "@testing-library/react";
import HourlyForecast from "./HourlyForecast";
import { HourlyForecastProps } from "../../types";

describe("HourlyForecast", () => {
    const mockHourly: HourlyForecastProps["hourly"] = [
        {
            time: "2025-08-02 09:00",
            temperature_c: 22.0,
            temperature_f: 71.6,
            condition: "Sunny",
            icon_url: "https://example.com/sunny.png"
        },
        {
            time: "2025-08-02 12:00",
            temperature_c: 25.0,
            temperature_f: 77.0,
            condition: "Cloudy",
            icon_url: "https://example.com/cloudy.png"
        }
    ];

    it("renders the hourly forecast heading", () => {
        render(<HourlyForecast hourly={mockHourly} unit="c" />);
        expect(screen.getByText("Hourly Forecast")).toBeInTheDocument();
    });

    it("renders each hourly item with time, icon, condition, and temp", () => {
        render(<HourlyForecast hourly={mockHourly} unit="f" />);

        expect(screen.getByText("09:00 a.m.")).toBeInTheDocument();
        expect(screen.getByText("12:00 p.m.")).toBeInTheDocument();

        expect(screen.getByText("71.6°F")).toBeInTheDocument();
        expect(screen.getByText("77°F")).toBeInTheDocument();

        expect(screen.getByAltText("Sunny")).toHaveAttribute("src", "https://example.com/sunny.png");
        expect(screen.getByAltText("Cloudy")).toHaveAttribute("src", "https://example.com/cloudy.png");
    });
});
