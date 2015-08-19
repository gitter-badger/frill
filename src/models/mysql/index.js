import Sequelize from '../setup_sequelize';
import users from './Users';
import posts from './Posts';

/**
 * List of all Sequelize models
 * @see {@link Users}
 * @see {@link Posts}
 * @external {Sequelize} http://docs.sequelizejs.com/en/latest
 */
const mysql = {
  Users: users(Sequelize),
  Posts: posts(Sequelize),
};

export default mysql;
