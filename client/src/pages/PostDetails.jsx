import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Tag, CheckCircle, ArrowLeft, Share2, Flag } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { usePosts } from '../context/PostContext';

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { posts, updatePost } = usePosts();

    const post = posts.find(p => p.post_id === parseInt(id));

    if (!post) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
                    <Button onClick={() => navigate('/')} className="mt-4">
                        Go Home
                    </Button>
                </div>
            </Layout>
        );
    }

    const isLost = post.type === 'lost';
    const isResolved = post.status === 'resolved';

    const handleContact = () => {
        navigate(`/posts/${post.post_id}/contact`);
    };

    const handleResolve = () => {
        const confirmMsg = isLost
            ? "Are you sure you found this item? This will mark the post as resolved."
            : "Is this your item? This will mark the post as resolved.";

        if (window.confirm(confirmMsg)) {
            updatePost(post.post_id, { status: 'resolved' });
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 pl-0 hover:bg-transparent hover:text-blue-600 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to feed
                </Button>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Status Banner */}
                    {isResolved && (
                        <div className="bg-green-50 px-6 py-3 border-b border-green-100 flex items-center gap-2 text-green-800 font-medium">
                            <CheckCircle className="w-5 h-5" />
                            This item has been marked as resolved.
                        </div>
                    )}

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <span className={`px-4 py-1.5 text-sm font-bold rounded-full uppercase tracking-wide ${isLost
                                    ? 'bg-red-50 text-red-700 border border-red-100'
                                    : 'bg-green-50 text-green-700 border border-green-100'
                                    }`}>
                                    {post.type}
                                </span>
                                <span className="text-gray-500 text-sm flex items-center gap-1">
                                    Posted on {new Date(post.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-50">
                                    <Flag className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>

                        {post.image && (
                            <div className="mb-8 rounded-lg overflow-hidden border border-gray-100">
                                <img src={post.image} alt={post.title} className="w-full h-auto max-h-96 object-cover" />
                            </div>
                        )}

                        <div className="prose max-w-none text-gray-600 mb-8 leading-relaxed">
                            <p>{post.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Location</p>
                                    <p className="font-medium text-gray-900">{post.location || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Category</p>
                                    <p className="font-medium text-gray-900">{post.category || 'Uncategorized'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Date</p>
                                    <p className="font-medium text-gray-900">{new Date(post.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                            <div className="text-sm text-gray-500">
                                Reported by <span className="font-medium text-gray-900">John Doe</span>
                            </div>

                            {!isResolved && (
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <Button variant="secondary" className="flex-1 sm:flex-none justify-center" onClick={handleContact}>
                                        Contact Reporter
                                    </Button>
                                    {isLost ? (
                                        <Button className="flex-1 sm:flex-none justify-center" onClick={handleResolve}>
                                            I Found This!
                                        </Button>
                                    ) : (
                                        <Button className="flex-1 sm:flex-none justify-center" onClick={handleResolve}>
                                            This is Mine!
                                        </Button>
                                    )}
                                </div>
                            )}
                            {isResolved && (
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <Button variant="outline" disabled className="flex-1 sm:flex-none justify-center opacity-50 cursor-not-allowed">
                                        Resolved
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PostDetails;
