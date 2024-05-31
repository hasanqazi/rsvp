# Setup 

## Install dependencies
npm install express body-parser @sendgrid/mail

## Run server
node server.js

# Hosting
heroku login

heroku create rsvp

git push heroku main

heroku open

heroku domains:add domain.com

heroku certs:auto:enable

heroku config:set SENDGRID_API_KEY=sendgrid_api_key

