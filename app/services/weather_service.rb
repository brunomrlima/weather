class WeatherService
  include HTTParty
  base_uri "http://api.weatherapi.com/v1"

  def initialize(zip_code)
    @zip_code = zip_code
    @api_key = Rails.application.credentials[Rails.env.to_sym][:weather_api][:api_key]
  end

  def fetch
    response = self.class.get("/current.json", query: query_params)

    raise "WeatherAPI request failed: #{response.code}" unless response.success?

    parse_response(response.parsed_response)
  end

  private

  def query_params
    {
      key: @api_key,
      q: @zip_code
    }
  end

  def parse_response(data)
    {
      location: data["location"]["name"],
      region: data["location"]["region"],
      country: data["location"]["country"],
      temperature: data["current"]["temp_c"],
      feels_like: data["current"]["feelslike_c"],
      condition: data["current"]["condition"]["text"],
      icon_url: "https:#{data['current']['condition']['icon']}",
      last_updated: data["current"]["last_updated"]
    }
  end
end
