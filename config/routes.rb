Rails.application.routes.draw do

  scope :api do
    # TO DO: add user creation/authentication routes.
    
    resources :sprints, only: [:index, :create, :destroy]
    resources :projects
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
