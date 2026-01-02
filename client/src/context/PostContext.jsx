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

    const updatePost = async (postId, updates) => {
        try {
            // Check if it's a resolve action
            if (updates.status === 'resolved') {
                const response = await fetch(`http://localhost:3000/api/posts/${postId}/resolve`, {
                    method: 'PUT',
                });
                if (!response.ok) throw new Error('Failed to resolve post');
            }

            // For now, optimistically update local state or re-fetch
            // Since we don't have a generic update endpoint yet, specific actions like resolve are handled
            setPosts(posts.map(post =>
                post.post_id === postId ? { ...post, ...updates } : post
            ));

        } catch (err) {
            console.error("Error updating post:", err);
        }
    };

    return (
        <PostContext.Provider value={{ posts, loading, error, addPost, updatePost }}>
            {children}
        </PostContext.Provider>
    );
};
