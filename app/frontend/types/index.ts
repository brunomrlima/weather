type ForecastDay = {
    date: string;
    condition: string;
    icon_url: string;
    high_c: number;
    high_f: number;
    low_c: number;
    low_f: number;
};

type HourlyData = {
    time: string;
    temperature_c: number;
    temperature_f: number;
    condition: string;
    icon_url: string;
}

type WeatherData = {
    condition: string;
    country: string;
    feels_like_c: number;
    feels_like_f: number;
    icon_url: string;
    last_updated: string;
    location: string;
    region: string;
    temperature_c: number;
    temperature_f: number;
    today: {
        high_c: number;
        low_c: number;
        high_f: number;
        low_f: number;
    };
    forecast: ForecastDay[];
    hourly: HourlyData[];
};

export type TempUnit = "c" | "f"

export type WeatherCardProps = {
    data: {
        data: WeatherData;
        from_cache: boolean;
    };
};

export type CurrentWeatherProps = {
    weather: WeatherData;
    unit: TempUnit;
};

export type ForecastProps = {
    forecast: ForecastDay[];
    unit: TempUnit;
};

export type TemperatureToggleProps = {
    value: TempUnit;
    onChange: (unit: TempUnit) => void;
};

export type HourlyForecastProps = {
    hourly: HourlyData[];
    unit: TempUnit;
};