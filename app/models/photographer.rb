# frozen_string_literal: true

class Photographer < ApplicationRecord
  has_many :galleries, dependent: :destroy
end
