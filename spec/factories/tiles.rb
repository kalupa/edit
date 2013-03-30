# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :tile do
    sequence(:tile_type){ |n| "tile_type_#{n}" }
    xpos { 1 + rand(100) }
    ypos { 1 + rand(100) }
  end
end
