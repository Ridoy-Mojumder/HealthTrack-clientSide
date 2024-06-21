

const Footer = () => {
    // Get current year dynamically
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Left section */}
                    <div className="flex flex-col items-start mb-4 md:mb-0">
                        <h2 className="text-lg font-semibold mb-2">About HealthTrack</h2>
                        <p className="text-sm">HealthTrack is a leading health and fitness platform dedicated to helping individuals track their health goals, monitor progress, and achieve a healthier lifestyle.</p>
                    </div>
                    {/* Right section */}
                    <div className="flex flex-col items-start md:items-end">
                        {/* Quick links */}
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
                            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Services</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        {/* Copyright */}
                        
                    </div>
                </div>
                <div className="text-sm text-center md:text-center mt-4">
                            <p>&copy; {currentYear} HealthTrack. All rights reserved.</p>
                            <p>Designed and developed by <a href="#" className="text-indigo-500 hover:text-indigo-700">Ridoy Mojumder</a></p>
                        </div>
            </div>
        </footer>
    );
};

export default Footer;
