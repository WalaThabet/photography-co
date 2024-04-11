module Photographers
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def create
      super do |photographer|
        if photographer.persisted?
          # Customize the response here if needed
          render json: { success: true, photographer: photographer.as_json }, status: :created and return
        end
      end
    end
  end
end
