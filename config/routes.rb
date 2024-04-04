# frozen_string_literal: true

Rails.application.routes.draw do
  get 'up' => 'rails/health#show', as: :rails_health_check

  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :photographers do
        resources :galleries
      end
    end
  end
end
