import Sequelize from '../sequelize';
import users from './Users';

/**
 * List of all DynamoDB models
 * @see {@link Users}
 */
const MySQLModels = {
  Users: users(Sequelize),
};

export default MySQLModels;
