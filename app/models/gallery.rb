# frozen_string_literal: true

class Gallery < ApplicationRecord
  include Rails.application.routes.url_helpers
  belongs_to :photographer
  has_many :photos, dependent: :destroy
  has_one_attached :cover_image

  def cover_image_url
    rails_blob_path(cover_image, only_path: true) if cover_image.attached?
  end
end
