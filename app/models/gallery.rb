class Gallery < ApplicationRecord
  belongs_to :photographer
  has_many :photos, dependent: :destroy
  has_one_attached :cover_image
end
