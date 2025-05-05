require('dotenv').config();               // 1) Carga .env
const express = require('express');
const config = require('./config/config'); 
const { sequelize } = require('./models');

// Routers 
const authRouter = require('./routes/auth');
const questionRouter = require('./routes/questions');
const answerRouter = require('./routes/answers');
const voteRouter = require('./routes/votes');

const app = express();

// 2) Middleware
app.use(express.json());                  // Parseo de JSON

// 3) Rutas
app.use('/api/auth', authRouter);
app.use('/api/questions', questionRouter);
app.use('/api/answers', answerRouter);
app.use('/api/votes', voteRouter);

// 4) Error handler 
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

// 5) Conexión a la BD y arranque
sequelize.sync({ alter: true })            // crea/ajusta tablas
  .then(() => {
    app.listen(config.port, () => {
      console.log(`🚀 Server listening on port ${config.port}`);
    });
  })
  .catch(err => {
    console.error('❌ No fue posible conectar a la BD:', err);
  });
