class Tile < ActiveRecord::Base
  validates_presence_of :tile_type, :xpos, :ypos
end
