-- ============================================================================
-- CampusFound Database Schema
-- MySQL 5.7+ / 8.0+
-- ============================================================================
-- Description: Complete database setup for Lost & Found application
-- Author: Yash (Database Team)
-- Created: 2026-01-01
-- ============================================================================

-- ============================================================================
-- DATABASE CREATION
-- ============================================================================
-- Create the database if it doesn't exist
-- ============================================================================

CREATE DATABASE IF NOT EXISTS campusfound_db 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- Use the database
USE campusfound_db;

-- ============================================================================
-- TABLE CLEANUP
-- ============================================================================
-- Drop existing tables if they exist (for development reset)
-- Note: Must drop in correct order due to foreign key constraints
-- ============================================================================

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

-- ============================================================================
-- USERS TABLE
-- ============================================================================
-- Stores registered user information for authentication and post ownership
-- ============================================================================

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique user identifier',
  name VARCHAR(100) NOT NULL COMMENT 'Full name of the user',
  email VARCHAR(150) NOT NULL UNIQUE COMMENT 'Email address (used for login)',
  password_hash VARCHAR(255) NOT NULL COMMENT 'Bcrypt hashed password',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Account creation timestamp',
  
  -- Indexes for performance
  INDEX idx_email (email) COMMENT 'Index for login queries'
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci
  COMMENT='User accounts table';

-- ============================================================================
-- POSTS TABLE
-- ============================================================================
-- Stores lost and found item reports
-- ============================================================================

CREATE TABLE posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique post identifier',
  title VARCHAR(100) NOT NULL COMMENT 'Brief title/name of the item',
  description TEXT NOT NULL COMMENT 'Detailed description of the item',
  type ENUM('lost', 'found') NOT NULL COMMENT 'Type of post: lost or found',
  status ENUM('open', 'resolved') NOT NULL DEFAULT 'open' COMMENT 'Status: open or resolved',
  category VARCHAR(50) COMMENT 'Item category (Electronics, Accessories, etc.)',
  location VARCHAR(200) COMMENT 'Location where item was lost/found',
  date DATE COMMENT 'Date when item was lost/found',
  image TEXT COMMENT 'Image URL or base64 data',
  user_id INT NOT NULL COMMENT 'User who created this post',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Post creation timestamp',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  
  -- Foreign key constraint
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  
  -- Indexes for efficient queries
  INDEX idx_type (type) COMMENT 'Filter posts by lost/found',
  INDEX idx_status (status) COMMENT 'Filter posts by status',
  INDEX idx_user_id (user_id) COMMENT 'Get all posts by a user',
  INDEX idx_created_at (created_at) COMMENT 'Sort posts chronologically',
  INDEX idx_category (category) COMMENT 'Filter posts by category'
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci
  COMMENT='Lost and found posts table';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these to verify the schema was created correctly
-- ============================================================================

-- View all tables
-- SHOW TABLES;

-- View users table structure
-- DESCRIBE users;

-- View posts table structure
-- DESCRIBE posts;

-- View indexes
-- SHOW INDEX FROM users;
-- SHOW INDEX FROM posts;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
