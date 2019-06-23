const Sequelize = require('sequelize');
const env = require('../config/config');
const sequelize = new Sequelize(env.development.database, env.development.username, env.development.password, {
  host: env.development.host,
  port: env.development.port,
  dialect: env.development.dialect
});

//Connects all models to one db object.
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/users')(sequelize, Sequelize);
db.incidents = require('../models/incidents')(sequelize, Sequelize);
db.lawyerLegalProfiles = require('../models/lawyerlegalprofiles')(sequelize, Sequelize);
db.legalFields = require('../models/legalfields')(sequelize, Sequelize);
db.legalIncidentMaps = require('../models/legalincidentmaps')(sequelize, Sequelize);
db.appointments = require('../models/appointments')(sequelize, Sequelize);


//Relations
db.users.hasMany(db.lawyerLegalProfiles); //one-to-many
db.lawyerLegalProfiles.hasMany(db.legalFields); //one-to-many
db.legalFields.hasMany(db.legalIncidentMaps); //one-to-many
db.incidents.hasMany(db.legalIncidentMaps); //one-to-many

module.exports = db;