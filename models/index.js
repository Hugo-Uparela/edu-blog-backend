const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

// Importa los modelos
const User = require('./User')(sequelize);
const Question = require('./Question')(sequelize);
const Answer = require('./Answer')(sequelize);
const Vote = require('./Vote')(sequelize);

// Define asociaciones
User.hasMany(Question, { foreignKey: 'userId' });
Question.belongsTo(User, { foreignKey: 'userId' });

Question.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

User.hasMany(Answer, { foreignKey: 'userId' });
Answer.belongsTo(User, { foreignKey: 'userId' });

Answer.hasMany(Vote, { foreignKey: 'answerId' });
Vote.belongsTo(Answer, { foreignKey: 'answerId' });

User.hasMany(Vote, { foreignKey: 'userId' });
Vote.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Question, Answer, Vote };