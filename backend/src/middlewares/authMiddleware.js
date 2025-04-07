import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide', error });
  }
};

export default authMiddleware;
