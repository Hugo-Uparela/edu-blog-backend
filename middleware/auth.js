const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

exports.authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ error: 'Token no proporcionado' });

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

exports.authorize = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    if (roles.length && !roles.includes(req.user.role))
      return res.status(403).json({ error: 'Acceso prohibido' });
    next();
  };
};