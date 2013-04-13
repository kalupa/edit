class Api::V1::TilesController < Api::V1::BaseController

  def index
    @tiles = Tile.all
    respond_with @tiles
  end

  def create
    @tile = Tile.new(permitted_params)
    if @tile.save
      render json: @tile, status: :created
    else
      render json: {errors: @tile.errors.full_messages.join(', ')}, status: :internal_server_error
    end
  end

  def update
    @tile = Tile.find(params[:id])

    if @tile.update_attributes(permitted_params)
      respond_with @tile
    else
      render json: {errors: @tile.errors.full_messages.join(', ')}, status: :internal_server_error
    end
  end

  def destroy
    @tile = Tile.find(params[:id])

    if @tile.destroy
      respond_with @tile
    end
  end

  private

  def permitted_params
    params.require(:tile).permit(:tile_type,:xpos,:ypos)
  end
end
