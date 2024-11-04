import logo from '../assets/krishiverse.png';
import img from '../assets/loginpage1.png'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { ref, get ,set} from 'firebase/database';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse, faLaptopCode, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faNfcDirectional } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    
    const signinUser = async (e) => {
        e.preventDefault(); 
        try {
            // Sign in the user with email and password
            await signInWithEmailAndPassword(auth, email, password);
            console.log('SignIn-Success!');

            const userEmailKey = email.replace('.', '_');
            const roleRef = ref(db, `IAM/${userEmailKey}/role`);

            // Check if the role exists in the database
            const snapshot = await get(roleRef);
            if (snapshot.exists()) {
                // Role exists, retrieve it and store it locally
                const role = snapshot.val();
                localStorage.setItem('userRole', role);
                console.log('User Role:', role);
            } else {
                // Role node doesn't exist, set a default role
                const defaultRole = "employee";
                await set(roleRef, defaultRole);
                localStorage.setItem('userRole', defaultRole);
                console.log(`Role not assigned, setting default role: ${defaultRole}`);
            }

            // Set authentication status and navigate to the main page
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/');

        } catch (err) {
            console.error(err);
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="flex justify-center h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/3"  style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <aside className='text-white'>
                                <h1 className=' mt-1 pl-24 text-2xl font-bold  text-white sm:text-3xl'>Welcome to Admin Panel of KrishiVerse</h1>
                                <div className="container px-5 py-8 flex flex-col">
                                    
                                        <div className="flex relative mb-2 pt-2">
                                            <div className="flex-grow pl-20">
                                                <h2 className="max-w-xl mt-3 text-gray-300"><strong>Manage stock</strong></h2>
                                                <p className="max-w-xl mt-3 text-gray-300">
                                                    <FontAwesomeIcon icon={faMoneyBillTrendUp} className="pr-2 "/>
                                                    Trust of 1000+ Farmers. We are proud to serve 1000+ farmers from 20+ states in India. The locations on the map show our devices installed at various farmers' fields, demonstrating how Indian farmers are quickly adapting to smart irrigation technologies.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex relative mb-2 pt-2">
                                            <div className="flex-grow pl-20">
                                                <h2 className="max-w-xl mt-3 text-gray-300"><strong>Manage device data</strong></h2>
                                                <p className="max-w-xl mt-3 text-gray-300">
                                                    <FontAwesomeIcon icon={faNfcDirectional} className="pr-2 "/>
                                                    Welcome to KrishiVerse - Buy the best irrigation solutions at the best prices! Maximize crop yields with our advanced irrigation technology.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex relative pb-5">
                                            <div className="flex-grow pl-20">
                                                <h2 className="max-w-xl mt-3 text-gray-300"><strong>Control devices</strong></h2>
                                                <p className="max-w-xl mt-3 text-gray-300">
                                                    <FontAwesomeIcon icon={faLaptopCode} className="pr-2 "/>
                                                    Transforming Irrigation, Revolutionizing Farming.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex relative pb-5">
                                            <div className="flex-grow pl-20">
                                                <h2 className="max-w-xl mt-3 text-gray-300"><strong>Inventory Management</strong></h2>
                                                <p className="max-w-xl mt-3 text-gray-300">
                                                    <FontAwesomeIcon icon={faWarehouse} className="pr-2"/>
                                                    Founded by Aditya Patel, Nishi Patil, and Prakhar Mani Tripathi.
                                                </p>
                                            </div>
                                        </div>
                                </div>
                            </aside>
                            
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        <div className="text-center">
                            <div className="flex justify-center mx-auto sm:mx-auto sm:w-full sm:max-w-sm">
                                <img alt="Krishi Verse" src={logo} className="mx-auto h-40 w-auto" />
                            </div>
                            <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                        </div>

                        <div className="mt-8">
                            <form>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        placeholder="UserId"
                                        required
                                        autoComplete="email"
                                        className="block w-full px-4 py-2 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:bo focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="mt-6">
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    </div>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="password"
                                        name="password"
                                        value={password}
                                        type="password"
                                        placeholder="Password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full px-4 py-2 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:bo focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="mt-6">
                                    <button type="submit" onClick={signinUser} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Sign in
                                    </button>
                                </div>
                            </form>

                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
