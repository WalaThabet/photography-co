# frozen_string_literal: true

module Photographers
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json
  end
end
