import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // For demo convenience, fallback mock therapist ID if header missing
    req.user = { id: req.headers["x-therapist-id"] || "66e01a9b4000000000000001", role: "therapist" };
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key", (err, user) => {
    if (err) {
      req.user = { id: req.headers["x-therapist-id"] || "66e01a9b4000000000000001", role: "therapist" };
      return next();
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
