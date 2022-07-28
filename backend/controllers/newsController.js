import { getMongoConnection } from "../utils/mongoConnection.js";

// GET 'all' news data
const getNews = async (req, res) => {
  const db = getMongoConnection();

  db.collection('news').find().sort({"date": -1}).toArray((err, items) => {
    res.end(JSON.stringify(items, null, 4));
  })
};

export { getNews };