import React, { useState } from 'react'
import AddCompanyModal from './AddCompanyModal'

export default function CompaniesHeader() {

    const [isOpen, setIsOpen] = useState()

    return (
        <>
            <div className='w-full p-6'>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">3 Important message</button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Add Company
                        </button>
                        {isOpen && <AddCompanyModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                    </div>
                </div>
            </div >
        </>
    )
}
