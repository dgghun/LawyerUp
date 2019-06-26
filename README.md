# LawyerUp
A video chat application built with Node.js.

## Getting started
Currently this app is split into two branches:
* develop - The main entry point
* videochat - The real-time video chat component

You will need to clone each of these individual branches to use the application. Please keep in mind this is currently under development.
:)

## Using the devlopment branch
Clone the branch
```
git clone http://github.com/VonHohenheim/LawyerUp/tree/develop
```
Install required Node.js modules
```
npm install
```
Create the MySQL database and generate the tables using Sequelize. You can modify the MySQL parameters if needed in the config/config.js file.
```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```
Seed (populate) the database with data.
```
npx sequelize-cli db:seed:all
```
Start the app on localhost:3000.
```
npm start
```

## Using the videochat branch
Clone the branch
```
git clone https://github.com/VonHohenheim/LawyerUp/tree/videochat
```
Install required Node.js modules
```
npm install
```
Run the app on localhost:3000 using Now.sh
```
now dev
```
