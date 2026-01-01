import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import PostCard from '../components/PostCard';
import Layout from '../components/Layout';
import { DUMMY_POSTS } from '../data/posts';

const Home = () => {
    const [filter, setFilter] = useState('all'); // all, lost, found
    const [search, setSearch] = useState('');

    const filteredPosts = DUMMY_POSTS.filter(post => {
        const matchesFilter = filter === 'all' || post.type === filter;
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.description.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <Layout>
            <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Recent Activity</h1>
                    <p className="text-gray-500 mt-1">Check what's been lost and found on campus recently.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex bg-white rounded-lg border border-gray-300 p-1">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('lost')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'lost' ? 'bg-red-50 text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Lost
                        </button>
                        <button
                            onClick={() => setFilter('found')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'found' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Found
                        </button>
                    </div>
                </div>
            </div>

            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map(post => (
                        <PostCard key={post.post_id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No matches found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
            )}
        </Layout>
    );
};

export default Home;
