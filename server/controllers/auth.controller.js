import bcrypt from "bcrypt";
import db from "../config/db.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, hash]
  );

  res.json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0)
    return res.status(401).json({ message: "Invalid email" });

  const valid = await bcrypt.compare(password, rows[0].password_hash);
  if (!valid)
    return res.status(401).json({ message: "Invalid password" });

  res.json({
    message: "Login successful",
    user_id: rows[0].user_id,
    name: rows[0].name,
  });
};
