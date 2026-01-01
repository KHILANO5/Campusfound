import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Upload } from 'lucide-react';
import { usePosts } from '../context/PostContext';

const CreatePost = () => {
    const navigate = useNavigate();
    const { addPost } = usePosts();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'lost', // lost or found
        category: '',
        location: '',
        date: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // For this dummy implementation, we'll just use the object URL or base64
            // In a real app, you'd upload to cloud storage
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, image: reader.result }); // Storing data URL for preview persist
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, image: null });
        setImagePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(formData);
        navigate('/');
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8">
                    <div className="mb-8 border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Report an Item</h2>
                        <p className="text-gray-500 mt-1">
                            Provide details about the item you lost or found to help match it with its owner.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="lost"
                                            checked={formData.type === 'lost'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-gray-700">Lost Item</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="found"
                                            checked={formData.type === 'found'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-gray-700">Found Item</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Item Name / Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                placeholder="e.g. Blue Herschel Backpack"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                placeholder="Describe the item in detail (color, brand, distinguishing marks, etc.)"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                                    onChange={handleChange}
                                >
                                    <option value="">Select a category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing & Accessories</option>
                                    <option value="id_cards">ID Cards / Wallet</option>
                                    <option value="books">Books / Notes</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location (Last Seen/Found)
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="e.g. Library 2nd Floor"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {!imagePreview ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <span className="mt-2 block text-sm font-medium text-gray-600">
                                    Upload an image (Optional)
                                </span>
                                <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
                            </div>
                        ) : (
                            <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-white text-gray-700 p-1.5 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                                >
                                    <span className="sr-only">Remove image</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        )}


                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <Button variant="secondary" type="button" onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Submit Report
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CreatePost;
