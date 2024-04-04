# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :photographers

  get 'up' => 'rails/health#show', as: :rails_health_check

  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :photographers do
        member do
          get 'dashboard'
        end
        resources :galleries do
          resources :photos
        end
      end
    end
  end
  get '*path', to: 'homepage#index', constraints: ->(request) { !request.xhr? && request.format.html? }
end
