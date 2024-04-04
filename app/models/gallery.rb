class Gallery < ApplicationRecord
  belongs_to :photographer
  has_many :photos, dependent: :destroy
end
