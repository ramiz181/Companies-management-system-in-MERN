import { useState } from 'react';
import { X } from 'lucide-react';

export default function AddCompanyModal({ isOpen, setIsOpen }) {
    // const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        website: '',
        status: 'Active',
        employees: '',
    });

    const [message, setMessage] = useState('')


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/addCompany', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(formData)

            });

            if (response.ok) {

                const result = response.json();

                setMessage('Company Added Successfully');

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    country: '',
                    website: '',
                    status: 'Active',
                    employees: '',
                })
            }

        } catch (error) {
            setMessage('Error in adding company...')
            console.log("Error ", error);

        }
    };

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            {/* <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Add Company
            </button> */}

            {/* {isOpen && ( */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                {/* <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative "> */}
                <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative'>
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-3 text-gray-500 hover:text-gray-800"
                    >
                        <X />
                    </button>

                    <h2 className="text-xl font-bold mb-4 text-blue-600">Add Company</h2>


                    <form onSubmit={handleSubmit} className=" grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
                        {['name', 'email', 'phone', 'address', 'city', 'country', 'website', 'employees'].map((field, index) =>
                            <div key={index}>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                <input
                                    key={field}
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div >
                        )}



                        < select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <p className='text-red-600'>{message}</p>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
                        >
                            Save Company
                        </button>
                    </form>
                </div>

                {/* </div> */}
            </div>
            {/* )} */}
        </div >
    );
}
