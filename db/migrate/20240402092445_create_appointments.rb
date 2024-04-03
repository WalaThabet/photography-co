# frozen_string_literal: true

class CreateAppointments < ActiveRecord::Migration[7.1]
  def change
    create_table :appointments do |t|
      t.references :photographer, null: false, foreign_key: true
      t.references :client, null: false, foreign_key: true
      t.datetime :date
      t.string :location
      t.string :status

      t.timestamps
    end
  end
end
