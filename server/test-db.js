import db from "./config/db.js";

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Database connection successful!");
    
    // Test query
    const [rows] = await connection.query("SELECT 1");
    console.log("✅ Database query successful!");
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

testConnection();
