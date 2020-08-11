const config = {
  express: {
    baseURL: 'http://',
    host: 'localhost',
    port: 5000,
  },
  mongoDb: {
    mongoUrl: 'mongodb://localhost:27017/',
    dbName: 'seafood-app',
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  }
}

module.exports = config; 