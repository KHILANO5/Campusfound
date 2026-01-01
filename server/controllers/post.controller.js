import db from "../config/db.js";

// @desc    Create new post
// @route   POST /api/posts
// @access  Public
export const createPost = async (req, res) => {
  try {
    const { title, description, type, user_id } = req.body;

    // Validate input
    if (!title || !description || !type || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate type (must match schema ENUM: 'lost' or 'found')
    if (type !== 'lost' && type !== 'found') {
      return res.status(400).json({ message: "Type must be 'lost' or 'found'" });
    }

    // Verify user exists
    const [userCheck] = await db.query(
      "SELECT user_id FROM users WHERE user_id = ?",
      [user_id]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Insert post (matches schema: title, description, type, user_id)
    // status defaults to 'open', created_at and updated_at auto-set
    const [result] = await db.query(
      "INSERT INTO posts (title, description, type, user_id) VALUES (?, ?, ?, ?)",
      [title, description, type, user_id]
    );

    res.status(201).json({
      message: "Post created successfully",
      post_id: result.insertId,
      title,
      description,
      type,
      status: 'open',
      user_id,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Server error creating post" });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    // Get all posts with user info (matches all schema fields)
    const [rows] = await db.query(`
      SELECT 
        p.post_id,
        p.title,
        p.description,
        p.type,
        p.status,
        p.user_id,
        p.created_at,
        p.updated_at,
        u.name as user_name,
        u.email as user_email
      FROM posts p
      JOIN users u ON p.user_id = u.user_id
      ORDER BY p.created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ message: "Server error fetching posts" });
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT 
        p.post_id,
        p.title,
        p.description,
        p.type,
        p.status,
        p.user_id,
        p.created_at,
        p.updated_at,
        u.name as user_name,
        u.email as user_email
      FROM posts p
      JOIN users u ON p.user_id = u.user_id
      WHERE p.post_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({ message: "Server error fetching post" });
  }
};

// @desc    Mark post as resolved
// @route   PUT /api/posts/:id/resolve
// @access  Public
export const resolvePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists
    const [existing] = await db.query(
      "SELECT post_id, status FROM posts WHERE post_id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existing[0].status === 'resolved') {
      return res.status(400).json({ message: "Post is already resolved" });
    }

    // Update status to 'resolved' (matches schema ENUM)
    await db.query(
      "UPDATE posts SET status = 'resolved' WHERE post_id = ?",
      [id]
    );

    res.json({
      message: "Post marked as resolved",
      post_id: parseInt(id),
      status: 'resolved',
    });
  } catch (error) {
    console.error("Resolve post error:", error);
    res.status(500).json({ message: "Server error resolving post" });
  }
};
