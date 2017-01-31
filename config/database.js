var path = require('path');

module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": `${path.resolve(__dirname, '..', 'dev.sqlite3')}`
  },
  "test": {
    "dialect": "sqlite",
    "storage": ":memory:"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
