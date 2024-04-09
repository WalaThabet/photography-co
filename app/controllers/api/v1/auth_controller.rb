# frozen_string_literal: true

module Api
  module V1
    class AuthController < ApplicationController
      def check_auth
        if photographer_signed_in?
          render json: { isAuthenticated: true, photographer: current_photographer.as_json }
        else
          render json: { isAuthenticated: false }, status: :unauthorized
        end
      end
    end
  end
end
