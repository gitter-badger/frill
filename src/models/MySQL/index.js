import Sequelize from '../setup_sequelize';
import users from './Users';

/**
 * List of all MySQL models
 * @see {@link Users}
 * @external {Sequelize} http://docs.sequelizejs.com/en/latest
 */
const MySQLModels = {
  Users: users(Sequelize),
};

export default MySQLModels;
