export default {
  app: 'Frill',
  /** @see {Sequelize} http://docs.sequelizejs.com/en/latest/ */
  sequelize: {
    database: 'test_db',
    username: 'username',
    password: 'password',
    options: {
      dialect: 'sqlite',
      storage: './.db/test.sqlite',
      logging: false,
    },
  },
  /** @see {AmazonWebServices} http://aws.amazon.com/ */
  AWS: {
    accessKeyId: 'myKeyId',
    secretAccessKey: 'secretKey',
    region: 'us-east-1',
  },
};
