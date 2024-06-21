import React, { useState } from "react";
import { Helmet } from "react-helmet";

const ContactUs = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    return (
        <div className="bg-gray-100">
            <Helmet>
                <title>Contact Us - HealthTrack Diagnostic Center</title>
                <meta name="description" content="Contact us to get in touch with our diagnostic center. Leave your comments and feedback." />
            </Helmet>
            {/* Hero section */}
            <section className="relative bg-cover bg-center py-20" style={{
                backgroundImage: `url('https://i.ibb.co/xjR8dTd/medical-instrument-operating-room-1048944-1406579.jpg')`
            }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl text-white font-bold text-center">Contact Us</h1>
                </div>
            </section>

            {/* Contact Form */}
            <section className="bg-gray-100 py-16 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        {/* Contact Form */}
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center md:text-center">Get in Touch</h2>
                            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
                                <textarea
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 mb-4"
                                    rows="5"
                                    placeholder="Write your message here..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold transition duration-300 focus:outline-none focus:bg-blue-600"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                        {/* Contact Image */}
                        <div className="md:w-1/2 md:pl-8">
                            <img src="https://i.ibb.co/3fK7t63/collage-customer-experience-concept-23-2149367138.jpg" alt="Diagnostic Center" className="rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            </section>


            {/* Customer Service Section */}
            <section className="bg-gray-200 py-12 relative" style={{ backgroundImage: `url('https://i.ibb.co/YNtbvRp/doctor-having-phone-call-using-her-computer-13339-205806.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                <div className="container mx-auto relative z-10">
                    <div className="text-white text-center">
                        <h2 className="text-4xl md:text-5xl font-semibold mb-8">Customer Service</h2>
                        <p className="text-lg text-gray-300 leading-relaxed mb-4">For any inquiries or assistance, please contact our customer service team:</p>
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <div className="flex items-center justify-center md:mr-8 mb-4 md:mb-0">
                                <p className="text-lg font-semibold mr-4 text-gray-300">Phone:</p>
                                <p className="text-lg text-gray-300">123-456-7890</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <p className="text-lg font-semibold mr-4 text-gray-300">Email:</p>
                                <p className="text-lg text-gray-300">info@yourdiagnosticcenter.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* User Comments */}
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold mb-6">User Comments</h2>
                    <div className="mt-12">
                        <form onSubmit={handleSubmit} className="mt-8">
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
                                rows="4"
                                placeholder="Write your comment here..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Add Comment
                            </button>
                        </form>
                    </div>
                    <div className="mt-12">
                        <ul className="divide-y divide-gray-200">
                            {comments.length === 0 ? (
                                <p className="text-gray-600">No comments yet.</p>
                            ) : (
                                comments.map((comment, index) => (
                                    <li key={index} className="py-4">
                                        <p className="text-lg text-gray-800">{comment}</p>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
