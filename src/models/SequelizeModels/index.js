import Sequelize from '../setup_sequelize';
import users from './Users';

/**
 * List of all Sequelize models
 * @see {@link Users}
 * @external {Sequelize} http://docs.sequelizejs.com/en/latest
 */
const SequelizeModels = {
  Users: users(Sequelize),
};

export default SequelizeModels;
