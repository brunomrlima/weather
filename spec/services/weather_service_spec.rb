require 'rails_helper'

RSpec.describe WeatherService do
  let(:zip_code) { "90210" }
  let(:api_key) { "test" }
  let(:url) { "http://api.weatherapi.com/v1/forecast.json?key=#{api_key}&q=#{zip_code}&days=5" }

  before do
    stub_request(:get, url)
      .to_return(
        status: 200,
        body: file_fixture("weather_api_response.json").read,
        headers: { "Content-Type" => "application/json" }
      )
  end

  describe "#fetch" do
    it "returns current weather, high/low (C/F), and forecast for a valid zip code" do
      result = described_class.new(zip_code).fetch

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
          )
        )
      )
    end
  end
end
