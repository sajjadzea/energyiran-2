const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const { authorize } = require('../middlewares/rbacMiddleware');
const { log } = require('../utils/logger');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/admin-only', jwtMiddleware, authorize(['admin']), (req, res) => {
  log('Admin route user:', req.user);
  res.json({ message: 'Welcome, admin!' });
});

module.exports = router;
