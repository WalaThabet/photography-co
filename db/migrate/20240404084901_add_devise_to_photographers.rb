# frozen_string_literal: true

class AddDeviseToPhotographers < ActiveRecord::Migration[7.1]
  def change
    ## Database authenticatable
    add_column :photographers, :encrypted_password, :string, null: false, default: ''

    ## Recoverable
    add_column :photographers, :reset_password_token, :string
    add_column :photographers, :reset_password_sent_at, :datetime

    ## Rememberable
    add_column :photographers, :remember_created_at, :datetime

    add_index :photographers, :reset_password_token, unique: true
  end
end
