// routes/answers.js
const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
const { authenticate } = require('../middleware/auth');


router.get('/', answerController.listAnswers);


router.post('/', authenticate, answerController.createAnswer);

module.exports = router;
