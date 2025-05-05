const { Vote } = require('../models');

// Listar todos los votos de una respuesta
exports.listVotes = async (req, res, next) => {
  try {
    const { answerId } = req.query;
    const votes = await Vote.findAll({ where: { answerId } });
    res.json(votes);
  } catch (err) {
    next(err);
  }
};

// Crear o actualizar un voto
exports.createVote = async (req, res, next) => {
  try {
    const { answerId, value } = req.body; // value: 1 ó -1
    const userId = req.user.id;

    let vote = await Vote.findOne({ where: { answerId, userId } });
    if (vote) {
      vote.value = value;
      await vote.save();
    } else {
      vote = await Vote.create({ answerId, userId, value });
    }
    res.status(200).json(vote);
  } catch (err) {
    next(err);
  }
};