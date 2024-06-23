import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePassword = async (password, hash) => {
  bcrypt.compare(password, hash);
}

export const hashPassword = async (password: string ) => {
  bcrypt.hash(password, 10);
}

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  console.log(token);   
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({ message: "You are not authorized" });
    return;
  }

  const [_, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json({ message: "You are not authorized" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "You are not authorized" });
    return;
  }
};
