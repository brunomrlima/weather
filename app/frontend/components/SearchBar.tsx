import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getWeatherInfo } from "../api/weather";

type Props = {
    onSuccess: (data: any) => void;
};

const SearchBar: React.FC<Props> = ({ onSuccess }) => {
    const [location, setLocation] = useState("");

    const mutation = useMutation({
        mutationFn: getWeatherInfo,
        onSuccess,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!location.trim()) return;

        mutation.mutate(location.trim());
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter city or ZIP code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={mutation.isPending}
                className="search-input"
            />
            <button
                type="submit"
                disabled={mutation.isPending}
                className="search-button"
            >
                {mutation.isPending ? "Searching..." : "Search"}
            </button>
            {mutation.isError && (
                <p className="search-error">⚠️ Failed to fetch weather info</p>
            )}
        </form>
    );
};

export default SearchBar;
