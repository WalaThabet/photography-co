# frozen_string_literal: true

class CreatePhotographers < ActiveRecord::Migration[7.1]
  def change
    create_table :photographers do |t|
      t.string :name
      t.string :email
      t.text :bio

      t.timestamps
    end
  end
end
