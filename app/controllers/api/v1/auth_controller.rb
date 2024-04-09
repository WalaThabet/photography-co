class Api::V1::AuthController < ApplicationController
  def check_auth
    if photographer_signed_in?
      render json: { isAuthenticated: true, photographer: current_photographer.as_json }
    else
      render json: { isAuthenticated: false }, status: :unauthorized
    end
  end
end
