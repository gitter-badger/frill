import Sequelize from 'sequelize';

/**
 * Posts model
 * @see http://docs.sequelizejs.com/en/latest/docs/models-definition/#definition
 */
const posts = (sequelize) => {
  return sequelize.define('posts', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
  }, {
    paranoid: true,
  });
};

export default posts;
