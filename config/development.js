exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    albums_api: process.env.URL
  },
  isDevelopment: true
};
