# frozen_string_literal: true

# app/controllers/photographers/registrations_controller.rb
module Photographers
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json
  end
end
