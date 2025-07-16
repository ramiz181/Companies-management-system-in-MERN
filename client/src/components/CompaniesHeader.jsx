import React from 'react'

export default function CompaniesHeader() {
    return (
        <>
            <div className='w-full p-6'>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">3 Important message</button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Company</button>
                    </div>
                </div>
            </div>
        </>
    )
}
