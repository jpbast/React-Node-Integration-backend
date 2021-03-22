const express = require('express');
const muralController = require('../controllers/muralController');
const auth = require('../controllers/authController');
const router = express.Router();

router.get('/', auth, muralController.getMural);
router.get('/delete/:id', auth, muralController.deletePost);
router.post('/new', auth, muralController.newPost);

module.exports = router;