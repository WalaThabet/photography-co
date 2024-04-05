# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'your-react-app-origin'
    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             credentials: true # if you need to support cookies
  end
end
