'use strict';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Constants from '../config/constants';


function onBeforeSave(user, options) {
  if (user.changed('password')) {
    return bcrypt.hash(user.password, Constants.security.saltRounds)
      .then((hash) => user.password = hash)
  }
  return Promise.resolve();
}


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    defaultScope: {
      attributes: ['id', 'first_name', 'last_name', 'username', 'email', 'role', 'created_at', 'updated_at']
    },
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      authenticate (password) {
        return bcrypt.compareSync(password, this.password);
      },

      generateToken () {
        return jwt.sign({ id: this.id }, Constants.security.sessionSecret, {
          expiresIn: Constants.security.sessionExpiration
        })
      }
    }
  });

  User.beforeCreate(onBeforeSave);
  User.beforeUpdate(onBeforeSave);
  return User;
};