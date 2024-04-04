# frozen_string_literal: true

class Photographer < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :galleries, dependent: :destroy
end
