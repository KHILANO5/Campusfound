-- ============================================================================
-- CampusFound Sample Data
-- ============================================================================
-- Test data for development and testing
-- Password for all users: "password123" (hashed with bcrypt)
-- ============================================================================

-- Clear existing data (if any)
DELETE FROM posts;
DELETE FROM users;

-- Reset auto-increment counters
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE posts AUTO_INCREMENT = 1;

-- ============================================================================
-- SAMPLE USERS
-- ============================================================================
-- Note: password_hash is bcrypt hash of "password123"
-- In production, use proper bcrypt hashing with salt rounds = 10
-- Example hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
-- ============================================================================

INSERT INTO users (name, email, password_hash) VALUES
('Pruthvi Patel', 'pruthvi@campusfound.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
('Nishit Shah', 'nishit@campusfound.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
('Yash Kumar', 'yash@campusfound.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
('Khilan Desai', 'khilan@campusfound.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
('Sarah Johnson', 'sarah@campusfound.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

-- ============================================================================
-- SAMPLE POSTS
-- ============================================================================

INSERT INTO posts (title, description, type, status, user_id) VALUES
-- Lost items
('Lost Black Wallet', 'Black leather wallet with multiple cards and ID. Lost near library building on Dec 28th.', 'lost', 'open', 1),
('Lost Silver iPhone 13', 'Silver iPhone 13 with cracked screen protector. Last seen in cafeteria.', 'lost', 'open', 2),
('Lost Blue Backpack', 'Blue JanSport backpack with laptop inside. Lost in parking lot C.', 'lost', 'resolved', 3),
('Lost College ID Card', 'Student ID card with name Khilan Desai. Lost somewhere in main building.', 'lost', 'open', 4),
('Lost Notebook', 'Red spiral notebook for Computer Science class. Has handwritten notes.', 'lost', 'open', 5),
('Lost Airpods Case', 'White Airpods Pro case. Lost in gym locker room.', 'lost', 'open', 1),
('Lost Car Keys', 'Toyota car keys with blue keychain. Last seen near parking entrance.', 'lost', 'resolved', 2),

-- Found items
('Found Water Bottle', 'Found a blue Nalgene water bottle near the sports complex. Has stickers on it.', 'found', 'open', 3),
('Found Glasses', 'Found prescription glasses with black frames in library reading room.', 'found', 'open', 4),
('Found USB Drive', 'Found 32GB SanDisk USB drive in computer lab. Contains project files.', 'found', 'resolved', 5),
('Found Textbook', 'Found Biology textbook (Campbell 12th edition) in lecture hall 101.', 'found', 'open', 1),
('Found Umbrella', 'Found black umbrella near main entrance. Compact size.', 'found', 'open', 2),
('Found Watch', 'Found silver Casio wristwatch in restroom. Digital display.', 'found', 'open', 3),
('Found Headphones', 'Found red Sony headphones in study area. Over-ear style.', 'found', 'resolved', 4);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- View all users
SELECT user_id, name, email, created_at FROM users;

-- View all posts with user names
SELECT 
  p.post_id,
  p.title,
  p.type,
  p.status,
  u.name AS posted_by,
  p.created_at
FROM posts p
JOIN users u ON p.user_id = u.user_id
ORDER BY p.created_at DESC;

-- Count posts by type
SELECT type, COUNT(*) as count FROM posts GROUP BY type;

-- Count posts by status
SELECT status, COUNT(*) as count FROM posts GROUP BY status;

-- ============================================================================
-- END OF SAMPLE DATA
-- ============================================================================
