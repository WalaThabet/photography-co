# frozen_string_literal: true

class Appointment < ApplicationRecord
  belongs_to :photographer
  belongs_to :client
end
