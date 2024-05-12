import jwt from "jsonwebtoken";

const generateToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.PRIVETE_KEY, {
      expiresIn: 60,
    });
  } catch (err) {
    return;
  }
};

export { generateToken };
