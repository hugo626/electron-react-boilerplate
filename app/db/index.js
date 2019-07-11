const isDev = require('electron-is-dev');
const config = require('../../knexfile');

const env = isDev ? 'dev' : 'production';
const knex = require('knex')(config[env]);

module.exports = knex;
