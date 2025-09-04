// middlewares/verifyAdmin.js
const verifyAdmin = (req, res, next) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verifying admin access" });
  }
};

export default verifyAdmin;
