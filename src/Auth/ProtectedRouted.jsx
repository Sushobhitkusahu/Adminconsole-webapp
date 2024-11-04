import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase'
import PropTypes from 'prop-types'
import { useEffect,useState } from "react";

const ProtectedRoute=({element})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        });


        return () => unsubscribe();
    }, []);

    if (loading) {

        return <div>Loading...</div>;
    }

   
    return isAuthenticated ? element : <Navigate to="/" />;
    
}

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default ProtectedRoute;





