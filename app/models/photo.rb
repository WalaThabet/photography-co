# frozen_string_literal: true

class Photo < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :gallery
  has_one_attached :image

  def image_url
    rails_blob_path(image, only_path: true) if image.attached?
  end
end
