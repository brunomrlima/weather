class WeatherService
  include HTTParty
  base_uri "http://api.weatherapi.com/v1"

  FORECAST_DAYS = 5

  def initialize(zip_code)
    @zip_code = zip_code
    @api_key = Rails.application.credentials[Rails.env.to_sym][:weather_api][:api_key]
  end

  def fetch
    response = self.class.get("/forecast.json", query: query_params)

    raise "WeatherAPI request failed: #{response.code}" unless response.success?

    parse_response(response.parsed_response)
  end

  private

  def query_params
    {
      key: @api_key,
      q: @zip_code,
      days: FORECAST_DAYS
    }
  end

  def parse_response(data)
    {
      location: data["location"]["name"],
      region: data["location"]["region"],
      country: data["location"]["country"],
      temperature_c: data["current"]["temp_c"],
      temperature_f: data["current"]["temp_f"],
      feels_like_c: data["current"]["feelslike_c"],
      feels_like_f: data["current"]["feelslike_f"],
      condition: data["current"]["condition"]["text"],
      icon_url: "https:#{data['current']['condition']['icon']}",
      last_updated: data["current"]["last_updated"],
      today: {
        high_c: data["forecast"]["forecastday"][0]["day"]["maxtemp_c"],
        high_f: data["forecast"]["forecastday"][0]["day"]["maxtemp_f"],
        low_c:  data["forecast"]["forecastday"][0]["day"]["mintemp_c"],
        low_f:  data["forecast"]["forecastday"][0]["day"]["mintemp_f"]
      },
      forecast: data["forecast"]["forecastday"].map do |day|
        {
          date: day["date"],
          condition: day["day"]["condition"]["text"],
          icon_url: "https:#{day['day']['condition']['icon']}",
          high_c: day["day"]["maxtemp_c"],
          high_f: day["day"]["maxtemp_f"],
          low_c:  day["day"]["mintemp_c"],
          low_f:  day["day"]["mintemp_f"]
        }
      end
    }
  end
end
