# frozen_string_literal: true

class Photo < ApplicationRecord
  belongs_to :gallery
  has_one_attached :image
end
