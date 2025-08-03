require 'rails_helper'

RSpec.describe WeatherService do
  let(:zip_code) { "90210" }
  let(:api_key) { "test" }
  let(:url) { "http://api.weatherapi.com/v1/current.json?key=#{api_key}&q=#{zip_code}" }

  before do
    stub_request(:get, url)
      .to_return(
        status: 200,
        body: file_fixture("weather_api_response.json").read,
        headers: { "Content-Type" => "application/json" }
      )
  end

  describe "#fetch" do
    it "returns parsed weather data for a valid zip code" do
      result = described_class.new(zip_code).fetch

      expect(result).to eq({
        location: "Beverly Hills",
        region: "California",
        country: "USA",
        temperature: 25.4,
        feels_like: 27.1,
        condition: "Sunny",
        icon_url: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
        last_updated: "2025-08-02 10:00"
      })
    end
  end
end
