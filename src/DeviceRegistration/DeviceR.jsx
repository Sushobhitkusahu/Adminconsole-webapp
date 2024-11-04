import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DeviceR = () => {
  const [imei, setImei] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [model, setModel] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [recharge, setRecharge] = useState(false);
  const handleUploadToUnreg = () => {
    if (!imei || !macAddress || !model ) {
      toast.error('Please fill all fields before uploading.');
      return;
    }   
    if (window.confirm('Are you sure you want to upload this data?')) {
      const db = getDatabase();
      const unregRef = ref(db, `qr/unreg/${imei}`);

      const deviceData = {
        mac: macAddress,
        model: parseInt(model),
        recharge: recharge,
      };
      set(unregRef, deviceData)
        .then(() => {
         // toast.success('Data successfully uploaded to unreg.');
        })
        .catch((error) => {
          console.error('Error uploading data:', error);
          toast.error('Error uploading data.');
        });
      const adminRef = ref(db, `qr/admin/${imei}`);
      const adminDeviceData = {
        mac: macAddress,
        model: parseInt(model),
        serialNo: serialNo,
      };
      set(adminRef, adminDeviceData)
        .then(() => {
          toast.success('Data successfully uploaded to admin.');
        })
        .catch((error) => {
          console.error('Error uploading data to admin:', error);
          toast.error('Error uploading data to admin.');
        });
    }
  };

  return (
    <>
      
        
        <h1 className="flex justify-center  text-md mb-6 text-xl font-semibold text-gray-800 dark:text-gray-400  ">Device Registration</h1>
      <div className="flex flex-col  justify-center items-center">
        <div className=" w-full max-w-sm bg-white   flex-col   rounded-lg shadow-md p-6">
          
         
          <div className="mb-5">
            <input
              type="text"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              placeholder="Enter IMEI"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Data:</label>
            <input
              type="text"
              placeholder="MAC Address"
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="SerialNo"
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              id="recharge"
              type="checkbox"
              checked={recharge}
              onChange={(e) => setRecharge(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="recharge" className="ml-2 block text-sm text-gray-700">
              Recharge
            </label>
          </div>
          <div className="flex justify-center">
            <button onClick={handleUploadToUnreg} 
            className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Upload
             </button>
          </div>
        </div>
        </div>
      
      <ToastContainer />

      


    </>
  );
}

export default DeviceR;