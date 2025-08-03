require 'rails_helper'

RSpec.describe WeatherService do
  let(:location) { "90210" }
  let(:api_key) { "test" }
  let(:url) { "http://api.weatherapi.com/v1/forecast.json?key=#{api_key}&q=#{location}&days=5" }

  before do
    stub_request(:get, url)
      .to_return(
        status: 200,
        body: file_fixture("weather_api_response.json").read,
        headers: { "Content-Type" => "application/json" }
      )
  end

  describe "#fetch" do
    it "returns current weather, high/low (C/F), forecast, and hourly for a valid zip code" do
      result = described_class.new(location).fetch

      expect(result).to include(
        location: "Beverly Hills",
        region: "California",
        country: "USA",
        temperature_c: 25.4,
        temperature_f: 77.7,
        feels_like_c: 27.1,
        feels_like_f: 80.8,
        condition: "Sunny",
        icon_url: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
        last_updated: "2025-08-02 10:00",
        today: {
          high_c: 30.1,
          high_f: 86.2,
          low_c: 19.4,
          low_f: 66.9
        },
        forecast: a_collection_including(
          include(
            date: "2025-08-02",
            condition: "Sunny",
            icon_url: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
            high_c: 30.1,
            high_f: 86.2,
            low_c: 19.4,
            low_f: 66.9
          ),
          include(
            date: "2025-08-03",
            condition: "Partly cloudy",
            icon_url: "https://cdn.weatherapi.com/weather/64x64/day/116.png",
            high_c: 29.5,
            high_f: 85.1,
            low_c: 18.3,
            low_f: 64.9
          ),
          include(
            date: "2025-08-04",
            condition: "Cloudy",
            icon_url: "https://cdn.weatherapi.com/weather/64x64/day/119.png",
            high_c: 28.0,
            high_f: 82.4,
            low_c: 17.8,
            low_f: 64.0
          )
        ),
        hourly: a_collection_including(
          include(
            time: "2025-08-02 09:00",
            temperature_c: 22.0,
            temperature_f: 71.6,
            condition: "Sunny",
            icon_url: "https://cdn.weatherapi.com/weather/64x64/day/113.png"
          ),
          include(
            time: "2025-08-02 12:00",
            temperature_c: 25.0,
            temperature_f: 77.0,
            condition: "Sunny",
            icon_url: "https://cdn.weatherapi.com/weather/64x64/day/113.png"
          )
        )
      )
    end

    it "raises WeatherError when the API request fails" do
      bad_location = "invalid-location"
      error_url = "http://api.weatherapi.com/v1/forecast.json?key=#{api_key}&q=#{bad_location}&days=5"

      stub_request(:get, error_url)
        .to_return(status: 400, body: "", headers: { "Content-Type" => "application/json" })

      service = WeatherService.new(bad_location)

      expect {
        service.fetch
      }.to raise_error(WeatherService::WeatherError, /WeatherAPI request failed/)
    end

    it "caches the forecast" do
      Rails.cache.clear
      expect(Rails.cache.exist?("weather_forecast:90210")).to be_falsey

      result = WeatherService.new("90210").fetch
      expect(result[:from_cache]).to be_falsey

      result2 = WeatherService.new("90210").fetch
      expect(result2[:from_cache]).to be_truthy
    end
  end
end
