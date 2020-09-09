const config = {
  express: {
    baseURL: 'http://',
    host: (process.env.HOST_ADDRESS),
    port: 5000,
  },
  mongoDb: {
    mongoUrl: (process.env.DB_URL),
    dbName: (process.env.DB_NAME),
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  }
}

module.exports = config; 