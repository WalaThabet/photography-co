# app/controllers/photographers/sessions_controller.rb
class Photographers::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super do |photographer|
      if photographer.persisted?
        sign_in(resource_name, resource)
        render json: { success: true, photographer: }, status: :created and return
      else
        render json: { success: false }, status: :unauthorized
      end
    end
  end

  def destroy
    super do
      signed_out = sign_out(resource_name)
      render json: { success: signed_out }, status: :ok
    end
  end
end
