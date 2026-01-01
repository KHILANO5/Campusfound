import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

async function testAPI() {
  console.log("\n🧪 Testing CampusFound API...\n");

  try {
    // Test 1: Register a new user
    console.log("1️⃣ Testing POST /api/auth/register");
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      name: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "password123",
    });
    console.log("✅ Registration successful:", registerResponse.data);

    // Test 2: Login
    console.log("\n2️⃣ Testing POST /api/auth/login");
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: "test@example.com",
      password: "password123",
    });
    console.log("✅ Login successful:", loginResponse.data);
    const userId = loginResponse.data.user_id;

    // Test 3: Create a post
    console.log("\n3️⃣ Testing POST /api/posts");
    const postResponse = await axios.post(`${BASE_URL}/posts`, {
      title: "Lost Wallet",
      description: "Black leather wallet lost near library",
      type: "lost",
      user_id: userId,
    });
    console.log("✅ Post created:", postResponse.data);

    // Test 4: Get all posts
    console.log("\n4️⃣ Testing GET /api/posts");
    const postsResponse = await axios.get(`${BASE_URL}/posts`);
    console.log("✅ Posts retrieved:", postsResponse.data.length, "posts found");

    // Test 5: Resolve a post
    if (postsResponse.data.length > 0) {
      const postId = postsResponse.data[0].post_id;
      console.log("\n5️⃣ Testing PUT /api/posts/:id/resolve");
      const resolveResponse = await axios.put(
        `${BASE_URL}/posts/${postId}/resolve`
      );
      console.log("✅ Post resolved:", resolveResponse.data);
    }

    console.log("\n✅ All tests passed!\n");
  } catch (error) {
    console.error("\n❌ Test failed:", error.response?.data || error.message);
  }
}

// Check if server is running
console.log("Waiting for server to start...");
setTimeout(testAPI, 2000);
