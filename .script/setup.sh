psql -U postgres postgres -c "CREATE DATABASE event_db;"
npm i
npm run migrate:latest
npm run build
npm start