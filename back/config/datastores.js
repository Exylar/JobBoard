module.exports.datastores = {
  default: {

    adapter: 'sails-mysql',
    url: `mysql://root:${process.env.MYSQL_PASSWORD}@db:3306/database`,

  },
};
