const express = require('express');
const router = express.Router();
const qc = require('../controllers/questionController');
const { authenticate } = require('../middleware/auth');

router.get('/', qc.listQuestions);
router.get('/:id', qc.getQuestion);
router.post('/', authenticate, qc.createQuestion);
router.delete('/:id', authenticate, qc.deleteQuestion);

module.exports = router;