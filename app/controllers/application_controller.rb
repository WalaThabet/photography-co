# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # If you're using API mode, you might skip CSRF protection for JSON requests
  protect_from_forgery unless: -> { request.format.json? }

  # Add before_action to configure permitted parameters, if needed
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  # This method allows custom parameters to be permitted for the devise controller actions
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[username email password password_confirmation])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[username email password current_password])
  end

  # Overwrite the method for JSON request to handle sign-in/sign-out responses
  def respond_to_on_destroy
    head :no_content if request.format.json?
  end
end
