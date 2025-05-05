const { Question, Answer, User, Vote } = require('../models');

exports.createQuestion = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const q = await Question.create({
      title,
      content,
      userId: req.user.id
    });
    res.status(201).json(q);
  } catch (err) {
    next(err);
  }
};

exports.listQuestions = async (req, res, next) => {
  try {
    const list = await Question.findAll({
      include: [{ model: User, attributes: ['id','name'] }],
      order: [['createdAt','DESC']]
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.getQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const q = await Question.findByPk(id, {
      include: [
        { model: User, attributes: ['id','name'] },
        { 
          model: Answer, 
          include: [
            { model: User, attributes: ['id','name'] },
            { model: Vote }
          ]
        }
      ]
    });
    if (!q) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json(q);
  } catch (err) {
    next(err);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const q = await Question.findByPk(id);
    if (!q) return res.status(404).json({ error: 'Pregunta no encontrada' });

    // Solo admin o creador
    if (req.user.role !== 'admin' && req.user.id !== q.userId)
      return res.status(403).json({ error: 'No autorizado' });

    await q.destroy();
    res.json({ message: 'Pregunta eliminada' });
  } catch (err) {
    next(err);
  }
};