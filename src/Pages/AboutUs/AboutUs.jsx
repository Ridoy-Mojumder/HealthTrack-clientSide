import { useState } from "react";
import { Helmet } from "react-helmet";


const AboutUs = () => {
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
                <title>About Us - HealthTrack Diagnostic Center</title>
                <meta name="description" content="Contact us to get in touch with our diagnostic center. Leave your comments and feedback." />
            </Helmet>
            {/* Hero section */}
            <section className="relative bg-cover bg-center py-20" style={{
                backgroundImage: `url('https://i.ibb.co/xjR8dTd/medical-instrument-operating-room-1048944-1406579.jpg')`
            }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl text-white font-bold text-center">About Our Diagnostic Center</h1>
                </div>
            </section>

            {/* Introduction */}
            <section className="container mx-auto py-12 px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h2 className="text-3xl font-semibold mb-4">About Our Center</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">At our center, we are committed to providing top-notch diagnostic services with a focus on your well-being.</p>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">Our state-of-the-art facilities and experienced medical professionals ensure accurate diagnoses and personalized care for every patient.</p>
                        <p className="text-lg text-gray-700 leading-relaxed">Discover peace of mind knowing that you are in capable hands at our diagnostic center.</p>
                    </div>
                    <div className="md:w-1/2">
                        <img src="https://i.ibb.co/tBmtmPF/1000-F-272220138-vj2-Nb-Nbpu-Zo-Ikt-W6-Q6-YTy-WXWTI3-GERf0.jpg" alt="Diagnostic Center" className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="bg-white py-12">
                <div className="container mx-auto">
                    <h2 className="text-4xl md:text-5xl font-semibold text-center mb-8 text-gray-800">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Team Member Card 1 */}
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
                            <img src="https://i.ibb.co/8dk9wFQ/veterinarian-check-ing-puppy-s-health-23-2148728392.jpg" alt="Team Member" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">Dr. John Doe</h3>
                                <p className="text-lg font-medium mb-4">Senior Veterinarian</p>
                                <p className="text-base leading-relaxed">Dr. John Doe is a dedicated senior veterinarian with over 15 years of experience in small animal care. He specializes in internal medicine and surgery.</p>
                            </div>
                        </div>

                        {/* Team Member Card 2 */}
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                            <img src="https://i.ibb.co/Rb9Ps9T/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-postur.jpg" alt="Team Member" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">Dr. Jane Smith</h3>
                                <p className="text-lg font-medium mb-4">Pediatric Specialist</p>
                                <p className="text-base leading-relaxed">Dr. Jane Smith is a compassionate pediatric specialist known for her gentle approach with young patients. She has a keen interest in child development and nutrition.</p>
                            </div>
                        </div>

                        {/* Team Member Card 3 */}
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-green-400 to-teal-500 text-white">
                            <img src="https://i.ibb.co/Bfg1YvG/she-was-made-medical-field-shot-young-female-doctor-using-digital-tablet-work-590464-63285.jpg" alt="Team Member" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">Dr. Michael Brown</h3>
                                <p className="text-lg font-medium mb-4">Cardiologist</p>
                                <p className="text-base leading-relaxed">Dr. Michael Brown is a dedicated cardiologist specializing in advanced cardiac imaging and minimally invasive treatments. He is committed to improving heart health in his patients.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            {/* Facilities */}
            <section className="relative bg-cover bg-center py-20" style={{
                backgroundImage: `url('https://i.ibb.co/sggQKf8/businessman-using-business-leadership-chart-3d-rendering-117023-243.jpg')`,
            }}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="container mx-auto relative z-10">
                    <div className="text-white text-center">
                        <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">State-of-the-art Facilities</h2>
                        <p className="text-lg md:text-xl text-gray-300 mb-8">Explore our cutting-edge infrastructure designed to elevate your experience.</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-md">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>




            {/* user Experience */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <div className="md:flex items-center justify-between">
                        <div className="md:w-1/2 mb-12 md:mb-0">
                            <h2 className="text-4xl font-semibold mb-6">Customer Experience</h2>
                            <p className="text-lg text-gray-800 leading-relaxed mb-6">
                                Discover a customer-first approach at our diagnostic center. We're dedicated to providing exceptional service that meets your needs and exceeds your expectations.
                            </p>
                            <p className="text-lg text-gray-800 leading-relaxed mb-6">
                                Whether you're here for routine check-ups or specialized diagnostics, our team ensures a comfortable experience with personalized care.
                            </p>
                        </div>
                        <div className="md:w-1/2 md:pl-12">
                            <img
                                src="https://i.ibb.co/Wf29nKm/collage-customer-experience-concept-23-2149367127.jpg"
                                alt="Customer Experience"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>

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
                        <h3 className="text-2xl font-semibold mb-4">User Comments</h3>
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
}

export default AboutUs;
