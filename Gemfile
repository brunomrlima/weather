source "https://rubygems.org"

gem "active_model_serializers"
gem "bootsnap", require: false
gem "httparty"
gem "puma", ">= 5.0"
gem "rails", "~> 8.0.2"
gem "redis"
gem "sqlite3", ">= 2.1"
gem "thor"
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "vite_rails"

group :development, :test do
  gem "brakeman", require: false
  gem "capybara"
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "factory_bot_rails"
  gem "rspec-rails"
  gem "rubocop-rails-omakase", require: false
  gem "selenium-webdriver"
  gem "webmock"
end

group :development do
  gem "foreman"
end
