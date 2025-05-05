require('dotenv').config();
const express   = require('express');
const morgan    = require('morgan');
const config    = require('./config/config'); 
const { sequelize } = require('./models');

const authRouter     = require('./routes/auth');
const questionRouter = require('./routes/questions');
const answerRouter   = require('./routes/answers');
const voteRouter     = require('./routes/votes');

const app = express();


// 1) Middleware de parsing 
app.use(express.json());


app.use(morgan('dev')); // morgan 

// 2) Rutas
app.use('/api/auth', authRouter);
app.use('/api/questions', questionRouter);
app.use('/api/answers', answerRouter);
app.use('/api/votes', voteRouter);

// 3) Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

// 4) Conexión BD y arranque
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`🚀 Server listening on port ${config.port}`);
    });
  })
  .catch(err => {
    console.error('❌ No fue posible conectar a la BD:', err);
  });
