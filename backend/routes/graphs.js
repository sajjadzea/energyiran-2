const express = require('express');
const router = express.Router();
const graphsController = require('../controllers/graphsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/api/graphs', authMiddleware, graphsController.getGraphs);

module.exports = router;
