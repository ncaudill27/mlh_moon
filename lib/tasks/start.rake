namespace :start do
  desc 'Start dev server'
  task :development do
    exec 'rails s -p 3001 & cd client && npm run start'
  end

  desc 'Start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall'
  end

  desc 'Prepare for local dev'
  task :prep do
    exec 'bundle && cd client && npm install && cd .. && rails db:setup'
  end
end
task start: 'start:development'