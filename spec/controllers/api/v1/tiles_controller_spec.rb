require 'spec_helper'

describe Api::V1::TilesController do

  describe 'GET #index' do

    it 'gives a list of tiles' do
      tile = create(:tile)
      get :index, format: :json

      expect(assigns(:tiles)).to match_array [tile]
    end

  end

  describe 'POST #create' do
    it 'creates a new tile' do
      new_tile = attributes_for(:tile)
      expect do
        post :create, format: :json, tile: new_tile
      end.to change(Tile, :count).by(1)
      expect(response.status).to be 201
    end

    it 'does not create an invalid tile' do
      expect do
        post :create, format: :json, tile: attributes_for(:tile, xpos: nil)
      end.to_not change(Tile, :count)
      expect(response.status).to be 500
    end
  end

  describe 'PUT #update' do
    before :each do
      @tile = create(:tile, tile_type: 'old_tile_type')
    end

    it 'finds the existing tile' do
      put :update, format: :json, id: @tile, tile: attributes_for(:tile)
      expect(assigns(:tile)).to eq(@tile)
    end

    it 'updates an existing tile' do

      put :update, format: :json, id: @tile,
        tile: attributes_for(:tile, tile_type: "new_tile_type")

      @tile.reload

      expect(@tile.tile_type).to eql "new_tile_type"
    end

    it 'does not update with bad params' do
      put :update, format: :json, id: @tile,
        tile: attributes_for(:tile, xpos: nil)
      @tile.reload
      expect(@tile.xpos).to_not be_nil
      expect(response.status).to be 500
    end
  end

  describe 'DELETE #destroy' do
    before(:each) do
      @tile = create(:tile)
    end

    it 'deletes the tile' do
      expect do
        delete :destroy, format: :json, id: @tile
      end.to change(Tile, :count).by(-1)
      expect(response.status).to be 204
    end
  end

end
