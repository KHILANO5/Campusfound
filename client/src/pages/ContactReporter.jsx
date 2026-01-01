import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Phone, User, ArrowLeft, MessageSquare } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { usePosts } from '../context/PostContext';

const ContactReporter = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { posts } = usePosts();

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

    return (
        <Layout>
            <div className="max-w-md mx-auto mt-10">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 pl-0 hover:bg-transparent hover:text-blue-600 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Post
                </Button>

                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="bg-blue-600 px-6 py-8 text-center text-white">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold">John Doe</h2>
                        <p className="text-blue-100 mt-1">Computer Science Major</p>
                    </div>

                    <div className="p-6">
                        <p className="text-gray-500 text-sm mb-6 text-center">
                            Contact regarding: <span className="font-semibold text-gray-900">{post.title}</span>
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Email Address</p>
                                    <a href="mailto:student@university.edu" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                                        student@university.edu
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Phone Number</p>
                                    <a href="tel:+15551234567" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                                        (555) 123-4567
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button className="w-full justify-center flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> Send Message
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ContactReporter;
