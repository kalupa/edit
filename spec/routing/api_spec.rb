require 'spec_helper'

describe '/api/v1/' do

  it 'tiles routes to tiles#index' do
    expect(get: '/api/v1/tiles').to be_routable
  end

  it 'tiles routes to tiles#create' do
    expect(post: '/api/v1/tiles').to be_routable
  end

  it 'tiles/:id routes to tiles#update' do
    expect(put: '/api/v1/tiles/1').to be_routable
  end

  it 'tiles/:id routes to tiles#destroy' do
    expect(delete: '/api/v1/tiles/1/').to be_routable
  end

end
