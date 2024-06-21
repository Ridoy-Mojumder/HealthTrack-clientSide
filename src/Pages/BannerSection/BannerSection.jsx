import { useEffect, useRef } from 'react';
import KeenSlider from 'keen-slider';
import 'keen-slider/keen-slider.min.css';
import { ArrowLeft, ArrowRight } from 'react-feather';

const SliderComponent = () => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = new KeenSlider(sliderRef.current, {
            loop: true,
            spacing: 20,
            slidesPerView: 1,
        });

        return () => {
            slider.destroy();
        };
    }, []);

    return (
        <div className="relative">
            <div ref={sliderRef} className="keen-slider relative">
                <div className="keen-slider__slide" style={{ height: '500px' }}>
                    <div className="relative h-full w-full">
                        <img className="absolute inset-0 w-full h-full object-cover" src="https://i.ibb.co/TLjGFf0/young-female-doctor-writing-new-drugs-recipe-senior-patient-healthcare-modern-hospital-private-clini.jpg" alt="Welcome to Our Diagnostic Center" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-8">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Our Diagnostic Center</h2>
                            <p className="text-lg md:text-xl font-semibold mb-6">Providing top-notch diagnostic services for your health and well-being.</p>
                            <button className="bg-white text-purple-500 px-6 py-3 rounded-full font-bold hover:bg-purple-200 transition duration-300">Learn More</button>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide" style={{ height: '500px' }}>
                    <div className="relative h-full w-full">
                        <img className="absolute inset-0 w-full h-full object-cover" src="https://i.ibb.co/4tkbX7y/young-woman-receiving-devastating-news-from-doctor-about-her-health-she-starts-crying-feels-lost-sad.jpg" alt="Get Expert Advice" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-8">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Expert Advice</h2>
                            <p className="text-lg md:text-xl font-semibold mb-6">Our experienced team is here to guide you through every step.</p>
                            <button className="bg-white text-teal-500 px-6 py-3 rounded-full font-bold hover:bg-teal-200 transition duration-300">Learn More</button>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide" style={{ height: '500px' }}>
                    <div className="relative h-full w-full">
                        <img className="absolute inset-0 w-full h-full object-cover" src="https://i.ibb.co/DrWPqgz/pediatrician-explaining-treatment-little-girl-wearing-protection-mask-specialist-medicine-with-prote.jpg" alt="Personalized Care" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-8">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Personalized Care</h2>
                            <p className="text-lg md:text-xl font-semibold mb-6">We provide care tailored to your unique needs and conditions.</p>
                            <button className="bg-white text-orange-500 px-6 py-3 rounded-full font-bold hover:bg-orange-200 transition duration-300">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 bottom-0 flex items-center justify-between w-full px-4 pointer-events-none">
                <button
                    onClick={() => sliderRef.current.prev()}
                    className="pointer-events-auto p-3 rounded-full bg-gray-900 bg-opacity-50 text-white hover:bg-opacity-70 transition duration-300"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                    onClick={() => sliderRef.current.next()}
                    className="pointer-events-auto p-3 rounded-full bg-gray-900 bg-opacity-50 text-white hover:bg-opacity-70 transition duration-300"
                >
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default SliderComponent;
