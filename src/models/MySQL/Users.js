import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const User = sequelize.define('User', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
});

export default User;
