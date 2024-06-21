import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="text-center p-8">
                <h1 className="text-9xl font-bold mb-4">404</h1>
                <h2 className="text-4xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-xl mb-8">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-500 transition duration-300">
                    Go to Homepage
                </Link>
            </div>
            <div className="mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-triangle text-indigo-600">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            </div>
        </div>
    );
};

export default ErrorPage;
