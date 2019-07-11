// Update with your config settings.
const path = require("path");

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, 'vm.sqlite')
    },
    useNullAsDefault: true
  },

  production: {
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, 'vm.sqlite')
    },
    useNullAsDefault: true
}

};
