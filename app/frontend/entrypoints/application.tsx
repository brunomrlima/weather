import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles/application.scss"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";

const queryClient = new QueryClient();

const App = () => {
    const [weatherData, setWeatherData] = useState<any>(null);

    return (
        <QueryClientProvider client={ queryClient }>
            <Navbar/>
            <div className="container">
                <SearchBar onSuccess={setWeatherData} />

                {weatherData && <WeatherCard data={weatherData} />}
            </div>
        </QueryClientProvider>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) createRoot(rootElement).render(<App/>);
