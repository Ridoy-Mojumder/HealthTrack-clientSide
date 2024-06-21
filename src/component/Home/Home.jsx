
import 'react-awesome-slider/dist/styles.css';
import { Helmet } from 'react-helmet';
import HomeForBanner from '../../Dashboard/Home/HomeForBanner';
import AllTestForHome from '../../Dashboard/Home/AllTestForHome';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home - HealthTrack Diagnostic Center</title>
                <meta name="description" content="Contact us to get in touch with our diagnostic center. Leave your comments and feedback." />
            </Helmet>
            <HomeForBanner></HomeForBanner>

            <AllTestForHome></AllTestForHome>
            <div>
                <section className="relative bg-cover bg-center py-20 my-8" style={{
                    backgroundImage: `url('https://i.ibb.co/sggQKf8/businessman-using-business-leadership-chart-3d-rendering-117023-243.jpg')`,
                }}>
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="container mx-auto relative z-10">
                        <div className='flex flex-col md:flex-row justify-center items-center gap-32'>
                            <div className="text-white text-center">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">100+ </h2>
                                <p className="text-lg md:text-xl text-gray-300 mb-8">Doctor</p>
                            </div>
                            <div className="text-white text-center">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">150+ </h2>
                                <p className="text-lg md:text-xl text-gray-300 mb-8">Nurse</p>
                            </div>
                            <div className="text-white text-center">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">200+ </h2>
                                <p className="text-lg md:text-xl text-gray-300 mb-8">Service man</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default Home;
