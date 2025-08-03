import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TemperatureToggle from "./TemperatureToggle";
import { TemperatureToggleProps } from "../../types";

describe("TemperatureToggle", () => {
    const setup = (value: TemperatureToggleProps["value"], onChange = jest.fn()) => {
        render(<TemperatureToggle value={value} onChange={onChange} />);
        return { onChange };
    };

    it("renders both °C and °F buttons", () => {
        setup("c");
        expect(screen.getByText("°C")).toBeInTheDocument();
        expect(screen.getByText("°F")).toBeInTheDocument();
    });

    it("highlights °C when value is 'c'", () => {
        setup("c");
        expect(screen.getByText("°C")).toHaveClass("active");
        expect(screen.getByText("°F")).not.toHaveClass("active");
    });

    it("highlights °F when value is 'f'", () => {
        setup("f");
        expect(screen.getByText("°F")).toHaveClass("active");
        expect(screen.getByText("°C")).not.toHaveClass("active");
    });

    it("calls onChange with 'c' when °C is clicked", () => {
        const { onChange } = setup("f");
        fireEvent.click(screen.getByText("°C"));
        expect(onChange).toHaveBeenCalledWith("c");
    });

    it("calls onChange with 'f' when °F is clicked", () => {
        const { onChange } = setup("c");
        fireEvent.click(screen.getByText("°F"));
        expect(onChange).toHaveBeenCalledWith("f");
    });
});
