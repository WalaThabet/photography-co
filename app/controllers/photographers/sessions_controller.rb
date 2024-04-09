# app/controllers/photographers/sessions_controller.rb
module Photographers
  class SessionsController < Devise::SessionsController
    respond_to :json

    def create
      super do |photographer|
        if photographer.persisted?
          logger.debug "Current session: #{session.inspect}"
          # Here you need to provide the photographer object or its JSON representation.
          # Assuming you have a method to serialize the photographer object to JSON:
          render json: { success: true, photographer: photographer.as_json }, status: :created
        else
          render json: { success: false }, status: :unauthorized
        end
        return # This ensures the rest of the Devise code doesn't run after this block
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
