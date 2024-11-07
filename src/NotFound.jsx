import { useNavigate } from "react-router-dom";
import logo from "./assets/404.jpg";

const NotFound = () => {
    const navigate = useNavigate(); 

    const handleHomeClick = () => {
        navigate(-1); 
    };

    return (
        <div>
            <section className="bg-black dark:bg-gray-900 ">
                <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                    <div className="w-full lg:w-1/2">
                        <p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
                        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-700"><strong>Sorry, the page you are looking for does not exist.</strong></p>

                        <div className="flex items-center mt-6 gap-x-3">
                            <button
                                className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                                onClick={handleHomeClick}
                            >
                                BACK
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                        <img className="w-full max-w-lg lg:mx-auto invert brightness" src={logo} alt="404 Not Found" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default NotFound;
