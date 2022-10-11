import 'dotenv/config';

const config = {
  express: {
    baseURL: 'http://',
    host: process.env.HOST_ADDRESS,
    port: process.env.PORT,
  },
  mongoDb: {
    mongoUrl: process.env.DB_URL,
    dbName: process.env.DB_NAME,
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
};

export default config;
