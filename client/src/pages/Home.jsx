import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, PlusCircle, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const Home = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative overflow-hidden py-16 sm:py-24">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
                            Lost something on <span className="text-blue-600">Campus?</span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                            Don't panic! CampusFound helps you reconnect with your lost belongings.
                            Report items you've found or search for what you've lost.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-10 flex justify-center gap-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <Link to="/feed">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 flex items-center gap-2"
                            >
                                <Search className="w-5 h-5" /> Browse Items
                            </motion.button>
                        </Link>
                        <Link to="/create-post">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-100 rounded-xl font-bold shadow-sm hover:border-blue-200 flex items-center gap-2"
                            >
                                <PlusCircle className="w-5 h-5" /> Report Item
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* Animated Background Blobs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        rotate: [0, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                        rotate: [0, -360]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10"
                />
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-blue-600" />}
                            title="Secure Platform"
                            description="Verified student access ensures your items are in safe hands."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Clock className="w-8 h-8 text-purple-600" />}
                            title="Real-time Updates"
                            description="Get notified instantly when your item status changes."
                            delay={0.4}
                        />
                        <FeatureCard
                            icon={<Users className="w-8 h-8 text-green-600" />}
                            title="Community Driven"
                            description="Join thousands of students helping each other every day."
                            delay={0.6}
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-16 text-center"
            >
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to help the community?</h2>
                    <Link to="/register">
                        <Button variant="primary" className="px-8 py-3 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                            Join CampusFound Today <ArrowRight className="inline-block ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </Layout>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
        <div className="mb-4 p-3 bg-gray-50 rounded-xl inline-block">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
    </motion.div>
);

export default Home;
