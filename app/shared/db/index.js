const config = require('./config');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development' ;
/* eslint-disable */
const knex = require('knex')(config[env]);

module.exports = knex;
