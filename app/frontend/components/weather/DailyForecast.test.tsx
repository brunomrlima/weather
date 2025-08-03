import React from "react";
import { render, screen } from "@testing-library/react";
import DailyForecast from "./DailyForecast";
import { ForecastProps } from "../../types";

describe("DailyForecast", () => {
    const mockForecast: ForecastProps["forecast"] = [
        {
            date: "2025-08-02",
            condition: "Sunny",
            icon_url: "https://example.com/sunny.png",
            high_c: 30.0,
            high_f: 86.0,
            low_c: 20.0,
            low_f: 68.0
        },
        {
            date: "2025-08-03",
            condition: "Cloudy",
            icon_url: "https://example.com/cloudy.png",
            high_c: 28.0,
            high_f: 82.4,
            low_c: 18.0,
            low_f: 64.4
        }
    ];

    it("renders the heading", () => {
        render(<DailyForecast forecast={mockForecast} unit="c" />);
        expect(screen.getByText("5-Day Forecast")).toBeInTheDocument();
    });

    it("renders each forecast day with correct data", () => {
        render(<DailyForecast forecast={mockForecast} unit="f" />);

        expect(screen.getByText("Sunny")).toBeInTheDocument();
        expect(screen.getByAltText("Sunny")).toHaveAttribute("src", "https://example.com/sunny.png");

        expect(screen.getByText("Cloudy")).toBeInTheDocument();
        expect(screen.getByAltText("Cloudy")).toHaveAttribute("src", "https://example.com/cloudy.png");
    });

    it("formats the day of the week correctly", () => {
        render(<DailyForecast forecast={mockForecast} unit="c" />);
        expect(screen.getByText("Sat")).toBeInTheDocument();
        expect(screen.getByText("Sun")).toBeInTheDocument();
    });
});
