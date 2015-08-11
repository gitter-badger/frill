import Sequelize from 'sequelize';
import config from 'config';

console.log(config);

/**
 * setup sequelize
 */
const sequelize = new Sequelize(
  config.get('MySQL.database'),
  config.get('MySQL.username'),
  config.get('MySQL.password'),
  config.get('MySQL.options')
);

export default sequelize;
