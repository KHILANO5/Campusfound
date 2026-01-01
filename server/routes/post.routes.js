import express from "express";
import {
  createPost,
  getPosts,
  resolvePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.put("/:id/resolve", resolvePost);

export default router;
