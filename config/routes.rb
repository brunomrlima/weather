Rails.application.routes.draw do
  root "root#index"
  get "root/index"

  namespace :api do
    namespace :v1 do
      resources :weather, only: :index
    end
  end
end
