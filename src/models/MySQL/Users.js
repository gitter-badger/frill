import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const Users = sequelize.define('User', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
});

export default Users;
