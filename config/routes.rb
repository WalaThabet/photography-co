# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :photographers, defaults: { format: :json }, controllers: {
    sessions: 'photographers/sessions',
    registrations: 'photographers/registrations'
  }

  get 'up' => 'rails/health#show', as: :rails_health_check

  root 'homepage#index'

  direct :rails_service_blob do |blob|
    route_for(:rails_blob, blob.signed_id, blob.filename)
  end

  namespace :api do
    namespace :v1 do
      get 'check_auth', to: 'auth#check_auth'
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
