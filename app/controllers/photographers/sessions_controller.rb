# frozen_string_literal: true

module Photographers
  class SessionsController < Devise::SessionsController
    respond_to :json

    def create
      super do |photographer|
        if photographer.persisted?
          render json: { success: true, photographer: photographer.as_json }, status: :created
        else
          render json: { success: false }, status: :unauthorized
        end
        return
      end
    end

    def destroy
      super do
        signed_out = sign_out(resource_name)
        render json: { success: signed_out }, status: :ok
      end
    end
  end
end
