import Sidebar from './SideBar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <>
       
        <div className="bg-[#F4F7FE] flex font-sans  h-screen flex-col md:flex-row">
             
            <Sidebar />
            <div className=" flex-1  mt-16 p-2   justify-center items-center md:w-full overflow-auto">
                <Outlet /> 
            </div>
        </div>
        </>
     
    );
};

export default AppLayout;



