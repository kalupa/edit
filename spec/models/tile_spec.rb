require 'spec_helper'

describe Tile do
  it 'is valid with a tile type and x and y positions' do
    expect(create(:tile, tile_type: 'tile')).to be_valid
    expect(Tile.first.tile_type).to eql 'tile'
  end
  it 'is invalid without a tile type' do
    expect(build(:tile, tile_type: nil)).to have(1).errors_on(:tile_type)
  end
  it 'is invalid without a x position' do
    expect(build(:tile, xpos: nil)).to have(1).errors_on(:xpos)
  end

  it 'is invalid without a y position' do
    expect(build(:tile, ypos: nil)).to have(1).errors_on(:ypos)
  end

end
