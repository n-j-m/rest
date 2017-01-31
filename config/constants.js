import path from 'path';
import merge from 'lodash/merge';


const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs () {
    return {
      test: process.env.NODE_ENV === 'test',
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production'
    };
  },

  version: require('../package.json').version,
  root: path.normalize(__dirname + '../..'),
  port: process.env.PORT || 3000,
  ip: process.env.IP || '0.0.0.0',
  apiPrefix: '/api',
  userRoles: ['guest', 'user', 'admin'],

  security: {
    sessionSecret: process.env.SECRET_KEY || 'super-secret-key',
    sessionExpiration: process.env.SESSION_EXPIRY || 60 * 60 * 24 * 7, // 1 week
    saltRounds: process.env.SALT_ROUNDS || 12
  }
};

const envConfigs = {
  development: {
    security: {
      saltRounds: 4
    }
  },
  test: {
    port: 5678,
    security: {
      saltRounds: 4
    }
  }
};


export default merge(defaultConfig, envConfigs[process.env.NODE_ENV] || {});
