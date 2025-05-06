const { Answer, User } = require('../models');

exports.listAnswers = async (req, res, next) => {
  try {
    const { questionId } = req.query;
    const answers = await Answer.findAll({
      where: { questionId },
      include: [{ model: User, attributes: ['id','name'] }],
      order: [['createdAt','ASC']],
    });
    res.json(answers);
  } catch (err) {
    next(err);
  }
};

exports.createAnswer = async (req, res, next) => {
  try {
    const { questionId, content } = req.body;
    const answer = await Answer.create({
      questionId,
      content,
      userId: req.user.id
    });
    res.status(201).json(answer);
  } catch (err) {
    next(err);
  }
};