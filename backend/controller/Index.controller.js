import express from 'express';

const IndexController = express.Router();

IndexController.get('/', (req, res) => {
  res.status(200).json({
    status: 'Express server running successfully.',
  });
});

export default IndexController;