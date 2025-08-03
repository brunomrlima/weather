export const displayTemp = (temperature_c: number, temperature_f: number, unit: string) =>
    unit === "c" ? `${temperature_c}°C` : `${temperature_f}°F`;