import { Helmet } from 'react-helmet';

const Service = () => {
    return (
        <div className="bg-gray-100">
            <Helmet>
                <title>Our Services - HealthTrack Diagnostic Center</title>
                <meta name="description" content="Explore the range of diagnostic services offered by HealthTrack Diagnostic Center. We provide comprehensive health solutions with cutting-edge technology." />
            </Helmet>

            {/* Hero section */}
            <section className="relative bg-cover bg-center py-20" style={{
                backgroundImage: `url('https://i.ibb.co/xjR8dTd/medical-instrument-operating-room-1048944-1406579.jpg')`
            }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl text-white font-bold text-center">Our Services</h1>
                </div>
            </section>

            {/* Services Overview */}
            <section className="container mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold">Comprehensive Diagnostic Services</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mt-4">At HealthTrack, we offer a wide range of diagnostic services to cater to all your healthcare needs. Our state-of-the-art technology and experienced professionals ensure accurate and reliable results.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Service Card 1 */}
                    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                        <img src="https://i.ibb.co/qrZj3Kw/patient-couch-doctor-makes-ultrasound-diagnosis-man-white-uniform-1157-46168.jpg" alt="Service 1" className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2">Radiology</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">Advanced imaging services including X-rays, MRI, and CT scans for accurate diagnostics.</p>
                        </div>
                    </div>

                    {/* Service Card 2 */}
                    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                        <img src="https://i.ibb.co/898LDYf/man-working-1048944-9589863.jpg" alt="Service 2" className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2">Laboratory Tests</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">Comprehensive lab testing services including blood tests, urinalysis, and more.</p>
                        </div>
                    </div>

                    {/* Service Card 3 */}
                    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                        <img src="https://i.ibb.co/CHx2f1z/doctor-looks-heart-hologram-checks-test-result-virtual-interface-analyzes-data-heart-disease-myocard.jpg" alt="Service 3" className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2">Cardiology</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">Specialized cardiac diagnostics including EKG, echocardiograms, and stress tests.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* More Services */}
            <section className="bg-white py-12">
                <div className="container mx-auto">
                    <h2 className="text-4xl md:text-5xl font-semibold text-center mb-8 text-gray-800">Additional Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Additional Service Card 1 */}
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
                            <img src="https://i.ibb.co/zN9Z96h/gynecologist-performing-ultrasound-consultation-23-2149353023.jpg" alt="Service 4" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">Ultrasound</h3>
                                <p className="text-lg leading-relaxed">Non-invasive imaging for monitoring pregnancies and diagnosing conditions.</p>
                            </div>
                        </div>

                        {/* Additional Service Card 2 */}
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                            <img src="https://i.ibb.co/hf4Ls6M/microbiologist-doctor-taking-blood-sample-tube-from-rack-with-machines-analysis-lab-background-48225.jpg" alt="Service 5" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">Pathology</h3>
                                <p className="text-lg leading-relaxed">Detailed examination of body tissues to diagnose diseases.</p>
                            </div>
                        </div>

                        {/* Additional Service Card 3 */}
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-green-400 to-teal-500 text-white">
                            <img src="https://i.ibb.co/w0vwgw9/gradient-mammography-illustration-23-2149360210.jpg" alt="Service 6" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">Mammography</h3>
                                <p className="text-lg leading-relaxed">Specialized imaging for early detection of breast cancer.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Testimonials */}
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto">
                    <h2 className="text-4xl md:text-5xl font-semibold text-center mb-8 text-gray-800">What Our Clients Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="rounded-lg overflow-hidden shadow-lg bg-white p-6">
                            <p className="text-lg text-gray-700 leading-relaxed">"HealthTrack Diagnostic Center provided excellent service. The staff was friendly and the diagnostics were very accurate. Highly recommend!"</p>
                            <div className="mt-4 text-right">
                                <p className="text-lg font-semibold text-gray-800">- Jane Doe</p>
                                <p className="text-sm text-gray-600">Patient</p>
                            </div>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg bg-white p-6">
                            <p className="text-lg text-gray-700 leading-relaxed">"The cardiology department at HealthTrack is top-notch. They took great care of me and the facilities are state-of-the-art."</p>
                            <div className="mt-4 text-right">
                                <p className="text-lg font-semibold text-gray-800">- John Smith</p>
                                <p className="text-sm text-gray-600">Patient</p>
                            </div>
                        </div>
                        {/* Add more testimonials as needed */}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-12">
                <div className="container mx-auto">
                    <h2 className="text-4xl md:text-5xl font-semibold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50 p-6">
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800">What are the operating hours?</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">Our center is open from 8 AM to 6 PM, Monday to Saturday. We are closed on Sundays and public holidays.</p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50 p-6">
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Do I need an appointment?</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">Appointments are recommended to ensure timely service, but walk-ins are also welcome.</p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50 p-6">
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800">How do I get my test results?</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">Test results are typically available within 24-48 hours. You can access them through our online portal or pick them up at our center.</p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50 p-6">
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800">What insurance plans do you accept?</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">We accept a wide range of insurance plans. Please contact our billing department for more information.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Service;
