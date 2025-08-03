class WeatherService
  include HTTParty
  base_uri "http://api.weatherapi.com/v1"

  FORECAST_DAYS = 5
  CACHE_EXPIRY = 30.minutes

  def initialize(location)
    @location = location
    @api_key = Rails.application.credentials[Rails.env.to_sym][:weather_api][:api_key]
  end

  def fetch
    cached = Rails.cache.read(cache_key)
    return cached.merge(from_cache: true) if cached

    response = self.class.get("/forecast.json", query: query_params)

    raise "WeatherAPI request failed: #{response.code}" unless response.success?

    parsed = parse_response(response.parsed_response)
    Rails.cache.write(cache_key, parsed, expires_in: CACHE_EXPIRY)

    parsed.merge(from_cache: false)
  end

  private

  def cache_key
    "weather_forecast:#{@location}"
  end

  def query_params
    {
      key: @api_key,
      q: @location,
      days: FORECAST_DAYS
    }
  end

  def parse_response(data)
    location = data["location"]
    current = data["current"]
    forecast_day = data["forecast"]["forecastday"]
    {
      location: location["name"],
      region: location["region"],
      country: location["country"],
      temperature_c: current["temp_c"],
      temperature_f: current["temp_f"],
      feels_like_c: current["feelslike_c"],
      feels_like_f: current["feelslike_f"],
      condition: current["condition"]["text"],
      icon_url: "https:#{current['condition']['icon']}",
      last_updated: current["last_updated"],
      today: {
        high_c: forecast_day.first["day"]["maxtemp_c"],
        high_f: forecast_day.first["day"]["maxtemp_f"],
        low_c:  forecast_day.first["day"]["mintemp_c"],
        low_f:  forecast_day.first["day"]["mintemp_f"]
      },
      forecast: forecast_day.map do |day|
        {
          date: day["date"],
          condition: day["day"]["condition"]["text"],
          icon_url: "https:#{day['day']['condition']['icon']}",
          high_c: day["day"]["maxtemp_c"],
          high_f: day["day"]["maxtemp_f"],
          low_c:  day["day"]["mintemp_c"],
          low_f:  day["day"]["mintemp_f"]
        }
      end,
      hourly: forecast_day.first["hour"].map do |h|
        {
          time: h["time"],
          temperature_c: h["temp_c"],
          temperature_f: h["temp_f"],
          condition: h["condition"]["text"],
          icon_url: "https:#{h['condition']['icon']}"
        }
      end
    }
  end
end
