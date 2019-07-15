const isDev = require('electron-is-dev');
const config = require('./config');

const env = isDev ? 'development' : 'production';
/* eslint-disable */
const knex = require('knex')(config[env]);

module.exports = knex;
