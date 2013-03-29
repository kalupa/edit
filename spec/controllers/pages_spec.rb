require 'spec_helper'

describe PagesController do
  describe 'GET #index' do
    it 'responds with a 200 OK status code' do
      get :index
      response.should be_success
      response.code.should eql "200"
    end

    it 'renders the index template' do
      get :index
      response.should render_template('index')
    end
  end
end
