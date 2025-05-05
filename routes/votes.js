const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');  // ruta correcta
const { authenticate } = require('../middleware/auth');

router.get('/', voteController.listVotes);
router.post('/', authenticate, voteController.createVote);

module.exports = router;