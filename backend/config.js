const config = {
  express: {
    baseURL: 'http://',
    host: 'localhost',
    port: 5000,
  },
  mongoDb: {
    mongoUrl: 'mongodb://mongo-db:27017/',
    dbName: 'seafood-app',
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      promiseLibrary: Promise
    }
  }
}

module.exports = config; 