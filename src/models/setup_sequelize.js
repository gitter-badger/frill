import Sequelize from 'sequelize';
import config from 'config';

/**
 * setup sequelize
 */
const sequelize = new Sequelize(
  config.get('sequelize.database'),
  config.get('sequelize.username'),
  config.get('sequelize.password'),
  config.get('sequelize.options')
);

export default sequelize;
