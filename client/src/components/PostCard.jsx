import React from 'react';
import { MapPin, Calendar, CheckCircle, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

const PostCard = ({ post }) => {
    const isLost = post.type === 'lost';
    const isResolved = post.status === 'resolved';

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 ${isResolved ? 'opacity-75' : ''}`}>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${isLost
                            ? 'bg-red-50 text-red-700 border border-red-100'
                            : 'bg-green-50 text-green-700 border border-green-100'
                            }`}>
                            {post.type}
                        </span>
                        {isResolved && (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide bg-gray-100 text-gray-600 border border-gray-200 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Resolved
                            </span>
                        )}
                    </div>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(post.created_at).toLocaleDateString()}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-15">
                    {post.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{post.location || 'Campus'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        <span>{post.category || 'General'}</span>
                    </div>
                </div>

                <Link to={`/posts/${post.post_id}`} className="block w-full">
                    <Button variant="outline" className="w-full text-sm py-2">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default PostCard;
