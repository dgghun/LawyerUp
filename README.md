# LawyerUp
A video chat application built with Node.js.

## Getting started
Currently this app is in development:
* develop branch- The main entry point

## Using the devlopment branch
Clone the branch
```
git clone http://github.com/VonHohenheim/LawyerUp
```
Checkout the developement branch
```
git checkout develop
```
Install required Node.js modules
```
npm install
```
Log into MySQL and create the database
```
mysql> CREATE DATABASE lawyerup_db_dev;
```

Generate the tables using Sequelize. You can modify the MySQL parameters if needed in the config/config.js file. 
```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```
Seed (populate) the database with data.
```
npx sequelize-cli db:seed:all
```
Start the app on localhost:3000 or localhost:8000 for HTTPS.
```
npm start
```

