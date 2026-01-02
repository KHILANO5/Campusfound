import React, { createContext, useState, useContext, useEffect } from 'react';

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    // Fetch posts from the server when the app starts
    useEffect(() => {
        fetch('http://localhost:3000/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error("Error fetching posts:", err));
    }, []);

    const addPost = (newPost) => {
        // Create a new post object with a unique ID and current timestamp
        const post = {
            ...newPost,
            post_id: posts.length + 1, // Simple ID generation
            created_at: new Date().toISOString(),
            status: 'open',
        };

        // Add new post to the beginning of the list
        setPosts([post, ...posts]);
    };

    const updatePost = (postId, updates) => {
        setPosts(posts.map(post =>
            post.post_id === postId ? { ...post, ...updates } : post
        ));
    };

    return (
        <PostContext.Provider value={{ posts, addPost, updatePost }}>
            {children}
        </PostContext.Provider>
    );
};
