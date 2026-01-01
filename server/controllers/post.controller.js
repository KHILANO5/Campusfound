import db from "../config/db.js";

export const createPost = async (req, res) => {
  const { title, description, type, user_id } = req.body;

  await db.query(
    "INSERT INTO posts (title, description, type, user_id) VALUES (?, ?, ?, ?)",
    [title, description, type, user_id]
  );

  res.json({ message: "Post created" });
};

export const getPosts = async (req, res) => {
  const [rows] = await db.query(`
    SELECT posts.*, users.name 
    FROM posts
    JOIN users ON posts.user_id = users.user_id
    ORDER BY posts.created_at DESC
  `);

  res.json(rows);
};

export const resolvePost = async (req, res) => {
  const { id } = req.params;

  await db.query(
    "UPDATE posts SET status = 'resolved' WHERE post_id = ?",
    [id]
  );

  res.json({ message: "Post marked as resolved" });
};
