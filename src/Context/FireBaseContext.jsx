import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';


import { auth, db } from '../firebase';

const FirebaseContext = createContext(null);



/////////////////////////changes////////////////

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={{ auth, db }}>
            {children}
        </FirebaseContext.Provider>
    );
};

FirebaseProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export const useFirebase = () => useContext(FirebaseContext);