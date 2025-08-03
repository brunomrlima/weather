class Api::V1::WeatherController < ApplicationController
  def index
    weather_data = WeatherService.new(weather_params[:location]).fetch
    render json: { data: weather_data }, status: :ok
  rescue WeatherService::WeatherError => e
    render json: { error: e.message }, status: :unprocessable_entity
  rescue => e
    render json: { error: "Unexpected error: #{e.message}" }, status: :internal_server_error
  end

  private

  def weather_params
    params.permit(:location)
  end
end
