import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/application.scss"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/Navbar";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={ queryClient }>
        <Navbar/>
        <div className="container">

        </div>
    </QueryClientProvider>
);

const rootElement = document.getElementById("root");
if (rootElement) createRoot(rootElement).render(<App/>);
