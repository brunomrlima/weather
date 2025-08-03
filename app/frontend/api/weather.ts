export const getWeatherInfo = async (location: string) => {
    const response = await fetch(`/api/v1/weather?location=${location}`, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch weather info");
    }

    return response.json();
};