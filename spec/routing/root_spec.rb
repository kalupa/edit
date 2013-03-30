require 'spec_helper'

describe 'root route' do
  it 'routes to pages#index' do
    expect(get: '/').to route_to(
      controller: 'pages',
      action: 'index'
    )
  end
end

