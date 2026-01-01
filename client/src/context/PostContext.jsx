import React, { createContext, useState, useContext } from 'react';

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch posts from backend
    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const addPost = async (newPost) => {
        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const savedPost = await response.json();
            setPosts([savedPost, ...posts]);
        } catch (err) {
            console.error("Error creating post:", err);
            // Optionally handle error state here
        }
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
