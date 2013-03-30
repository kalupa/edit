class CreateTiles < ActiveRecord::Migration
  def change
    create_table :tiles do |t|
      t.string :tile_type
      t.integer :xpos
      t.integer :ypos

      t.timestamps
    end
  end
end
