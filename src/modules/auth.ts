import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  console.log(token);
  return token;
};

export const protect = (req, res) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({ message: "You are not authorized" });
    return;
  }
};
