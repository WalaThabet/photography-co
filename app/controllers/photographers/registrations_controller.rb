# app/controllers/photographers/registrations_controller.rb
class Photographers::RegistrationsController < Devise::RegistrationsController
  respond_to :json
end
