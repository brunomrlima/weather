class Api::V1::WeatherController < ApplicationController
  def index
    render json: { data: WeatherService.new(weather_params[:location]).fetch }, status: :ok
  end

  private

  def weather_params
    params.require(:weather).permit(:location)
  end
end
