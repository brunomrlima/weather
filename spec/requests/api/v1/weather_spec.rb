require 'rails_helper'

RSpec.describe "Api::V1::Weathers", type: :request do
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

  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/weather", params: { location: "90210" }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["data"]).to include("temperature_c", "condition")
    end
  end
end
