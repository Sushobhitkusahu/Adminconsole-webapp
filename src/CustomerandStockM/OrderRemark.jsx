import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ref, onValue, update, remove } from 'firebase/database';
import Portal from './Portals';


const OrderRemark = ({orderId}) => {
    const [remarks, setRemarks] = useState([]);
    const [newRemark, setNewRemark] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [isAddingRemark, setIsAddingRemark] = useState(false);
    const [remarkName, setRemarkName] = useState('');
/////fetching existing data
    useEffect(() => {
        // Fetch existing remarks from Firebase
        const remarksRef = ref(db, `ordersNew/${orderId}/remark`);
        onValue(remarksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRemarks(Object.values(data)); // 
            } else {
                setRemarks([]); // 
            }
        });
    }, [orderId]);
//handling add remark 
const handleAddRemark = () => {
if (newRemark.trim()===''|| remarkName.trim()==='')
{
    toast.error('Please fill both');
    return;
}
const remarkData={
    text:newRemark,
    madeBy:remarkName,
};
const remarksRef=ref(db,`ordersNew/${orderId}/remark`)
const updatedRemarks=[...remarks,remarkData];
const formattedRemarks=updatedRemarks.reduce((acc,remark,index,)=>{
    acc[index]=remark;
    return acc;
},{})
update (remarksRef,formattedRemarks).then(()=>{
    setNewRemark('')
    setRemarkName('')
    setIsAddingRemark(false);
}).catch((error)=>{
    console.error('Failed to add remark ',error)
})
}
const handleDeleteRemark=(index)=>{
    const remarksRef=ref(db,`ordersNew/${orderId}/remark/${index}`)
    remove(remarksRef).then(()=>{
        //remark removed
    })
}



return(
    <div className="customer-remark">
        <div className='flex justify-evenly items-center'> 
            {remarks.length > 0 ? (
                <ul>
                    {remarks.slice(0, showAll ? remarks.length : 1).map((remark, index) => (
                        <li key={index} className="flex">
                            <span title={`Remark by: ${remark.madeBy}`}>
                                {remark.text}
                            </span>
                            <button
                                className="text-red-500 ml-2 mr-2"
                                onClick={() => handleDeleteRemark(index)}
                            >
                                <FontAwesomeIcon icon={faTrash} className='text-sm' />
                            </button>
                        </li>
                    ))}

                    {remarks.length > 1 && (
                        <button
                            className="text-blue-500 text-xs mt-1"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                </ul>

            ) : (
                <>

                </>
            )}

            <button
                onClick={() => setIsAddingRemark(true)}
                className=" bg-blue-500 text-white px-2 py-1 rounded-lg  "
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
            {isAddingRemark && (
                <Portal onClose={() => setIsAddingRemark(false)}>
                    <ToastContainer />
                    <h2 className="text-2xl font-bold mb-4">Add New Remark</h2>
                    <div className="mb-4">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            value={remarkName}
                            onChange={(e) => setRemarkName(e.target.value)}
                            className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                        <label className="block mb-1">Message</label>
                        <textarea
                            type="text"
                            value={newRemark}
                            onChange={(e) => setNewRemark(e.target.value)}
                            className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your remark"
                            required
                        />
                        <div className='flex justify-center items-center'>
                                <button
                            onClick={handleAddRemark}
                            className="py-2 px-10 rounded-lg  bg-blue-600 text-white  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                            Add
                                </button>
                            </div>
                    </div>
                </Portal>
            )}

         </div>
</div>
  )
}

OrderRemark.prototype={
    orderId: PropTypes.number.isRequired,
}

export default OrderRemark