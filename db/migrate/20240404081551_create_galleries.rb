class CreateGalleries < ActiveRecord::Migration[7.1]
  def change
    create_table :galleries do |t|
      t.string :title
      t.text :description
      t.references :photographer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
