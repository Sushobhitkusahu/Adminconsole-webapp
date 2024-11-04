import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './Auth/Login';
import Customer from './CustomerandStockM/CoustomerM.jsx';
import NotFound from './NotFound';
import DeviceData from './UserandDeviceData/DeviceData.jsx';
import LogOut from './Auth/Logout.jsx';
import UserData from './UserandDeviceData/UserData.jsx';
import AppLayout from './AppLayout.jsx';
import DeviceR from './DeviceRegistration/DeviceR.jsx';
import StockM from './CustomerandStockM/StockM.jsx';
import ProtectedRoute from './Auth/ProtectedRouted.jsx';
import Home from './Home.jsx';
import Authorization from '../src/Auth/Authorization.jsx';
import CoustomerM from './CustomerandStockM/CoustmPara.jsx';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

//
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserRole(localStorage.getItem('userRole'));
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });


    return () => unsubscribe();
  }, []);

  if (loading) {


    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8  border-gray-200">

          </div>

          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">

          </div>
          <div className="text-xl flex justify-center text-blue-400">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" /> : <Login />,

    },
    {
      path: "/",

      element: isAuthenticated ? <ProtectedRoute element={<AppLayout />} /> : <Navigate to="/login" />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        { path: "authorization", 
          element: (userRole === 'admin'||userRole==='manager') ? <Authorization /> : <Navigate to="/" /> },

        {
          path: "order",
          element: <Customer />,
        },
        {
          path: 'order/:orderId',
          element:<CoustomerM/>,
        },
    {
      path: "device-data",
      element: <DeviceData />,
    },
    {
      path: "user-data",
      element: <UserData />,
    },
    {
      path: "device-registration",
      element: <DeviceR />,
    },
    {
      path: "stock",
      element: <StockM />,
    },
    {
      path: "logout",
      element: <LogOut />,
    },
  ],
    },
  ]);

return <RouterProvider router={router} />;
};

export default App;
