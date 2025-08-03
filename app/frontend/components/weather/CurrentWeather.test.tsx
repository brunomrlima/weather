import React from "react";
import { render, screen } from "@testing-library/react";
import CurrentWeather from "./CurrentWeather";
import { CurrentWeatherProps } from "../../types";
import * as utils from "../../utils/utils";

// Mock displayTemp
jest.mock("../../utils/utils", () => ({
    displayTemp: jest.fn((c, f, unit) => `${unit === "c" ? c : f}°${unit.toUpperCase()}`)
}));

describe("CurrentWeather", () => {
    const mockWeather: CurrentWeatherProps["weather"] = {
        location: "Toronto",
        region: "Ontario",
        country: "Canada",
        temperature_c: 22,
        temperature_f: 71.6,
        feels_like_c: 21,
        feels_like_f: 69.8,
        condition: "Clear",
        icon_url: "https://example.com/clear.png",
        last_updated: "2025-08-02 14:00",
        today: {
            high_c: 28,
            high_f: 82.4,
            low_c: 16,
            low_f: 60.8
        },
        forecast: [],
        hourly: [],
        from_cache: false
    };


    it("renders all weather information correctly for Celsius", () => {
        render(<CurrentWeather weather={mockWeather} unit="c" />);

        expect(screen.getByAltText("Clear")).toHaveAttribute("src", "https://example.com/clear.png");

        const conditionRow = screen.getByText("Condition:").closest("p");
        expect(conditionRow).toHaveTextContent("Condition: Clear");

        const temperatureRow = screen.getByText("Temperature:").closest("p");
        expect(temperatureRow).toHaveTextContent("Temperature: 22°C");

        const feelsLikeRow = screen.getByText("Feels Like:").closest("p");
        expect(feelsLikeRow).toHaveTextContent("Feels Like: 21°C");

        const highLowRow = screen.getByText("High / Low:").closest("p");
        expect(highLowRow).toHaveTextContent("High / Low: 28°C / 16°C");
    });

    it("renders temperature values in Fahrenheit", () => {
        render(<CurrentWeather weather={mockWeather} unit="f" />);

        const temperatureRow = screen.getByText("Temperature:").closest("p");
        expect(temperatureRow).toHaveTextContent("Temperature: 71.6°F");

        const feelsLikeRow = screen.getByText("Feels Like:").closest("p");
        expect(feelsLikeRow).toHaveTextContent("Feels Like: 69.8°F");

        const highLowRow = screen.getByText("High / Low:").closest("p");
        expect(highLowRow).toHaveTextContent("High / Low: 82.4°F / 60.8°F");
    });

});
