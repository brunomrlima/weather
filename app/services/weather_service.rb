class WeatherService
  include HTTParty
  base_uri "http://api.weatherapi.com/v1"

  FORECAST_DAYS = 5
  CACHE_EXPIRY = 30.minutes

  def initialize(location)
    @location = location
    @api_key = api_key
  end

  def fetch
    cached = Rails.cache.read(cache_key)
    return cached.merge(from_cache: true) if cached

    response = self.class.get("/forecast.json", query: query_params)

    raise WeatherError, "WeatherAPI request failed: #{response.code}" unless response.success?

    parsed = parse_response(response.parsed_response)
    Rails.cache.write(cache_key, parsed, expires_in: CACHE_EXPIRY)

    parsed.merge(from_cache: false)
  end

  private

  def api_key
    return "test" if Rails.env.test?

    ENV["WEATHER_API_KEY"]
  end

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
    {
      location: location_name(data),
      region: data.dig("location", "region"),
      country: data.dig("location", "country"),
      temperature_c: data.dig("current", "temp_c"),
      temperature_f: data.dig("current", "temp_f"),
      feels_like_c: data.dig("current", "feelslike_c"),
      feels_like_f: data.dig("current", "feelslike_f"),
      condition: data.dig("current", "condition", "text"),
      icon_url: icon_url(data.dig("current", "condition", "icon")),
      last_updated: data.dig("current", "last_updated"),
      today: build_today(data),
      forecast: build_forecast(data),
      hourly: build_hourly(data)
    }
  end

  def location_name(data)
    data.dig("location", "name")
  end

  def icon_url(path)
    "https:#{path}"
  end

  def build_today(data)
    first_day = data.dig("forecast", "forecastday", 0, "day")
    {
      high_c: first_day["maxtemp_c"],
      high_f: first_day["maxtemp_f"],
      low_c:  first_day["mintemp_c"],
      low_f:  first_day["mintemp_f"]
    }
  end

  def build_forecast(data)
    data.dig("forecast", "forecastday")&.map do |day|
      {
        date: day["date"],
        condition: day.dig("day", "condition", "text"),
        icon_url: icon_url(day.dig("day", "condition", "icon")),
        high_c: day.dig("day", "maxtemp_c"),
        high_f: day.dig("day", "maxtemp_f"),
        low_c:  day.dig("day", "mintemp_c"),
        low_f:  day.dig("day", "mintemp_f")
      }
    end
  end

  def build_hourly(data)
    data.dig("forecast", "forecastday", 0, "hour")&.map do |h|
      {
        time: h["time"],
        temperature_c: h["temp_c"],
        temperature_f: h["temp_f"],
        condition: h.dig("condition", "text"),
        icon_url: icon_url(h.dig("condition", "icon"))
      }
    end
  end

  class WeatherError < StandardError; end
end
