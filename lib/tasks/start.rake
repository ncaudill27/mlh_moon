namespace :start do
  desc 'Start dev server'
  task :development do
    exec 'rails s -p 3001 && cd client && npm start'
  end

  desc 'Start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall'
  end
end
task start: 'start:development'