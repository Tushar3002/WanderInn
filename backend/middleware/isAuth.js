import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Missing auth token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid auth token" });
    }

    req.userId = decoded.userId;
    req.isAdmin = Boolean(decoded.isAdmin);
    req.user = { id: decoded.userId, isAdmin: Boolean(decoded.isAdmin) };
    next();
  } catch (error) {
    return res.status(401).json({ message: `Unauthorized: ${error.message}` });
  }
};

export default isAuth;
