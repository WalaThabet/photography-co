class CreatePhotos < ActiveRecord::Migration[7.1]
  def change
    create_table :photos do |t|
      t.references :photographer, null: false, foreign_key: true
      t.text :caption

      t.timestamps
    end
  end
end
