import React, { useState } from 'react'
import AddCompanyModal from './AddCompanyModal'
import { PanelLeftIcon, X } from 'lucide-react'

export default function CompaniesHeader(props) {

    const [isOpen, setIsOpen] = useState()

    return (
        <>
            <div className='w-full p-3 sm:p-4 md:p-6'>
                <div className="flex justify-between w-full items-center">
                    <div className='flex items-center gap-2'>
                        <button className='bg-white shadow-sm p-[5px] rounded border border-black-100'
                            onClick={() => props.toggleSidebar(prev => !prev)}
                        >
                            <PanelLeftIcon className='w-4 h-4' />
                        </button>

                        <h1 className="text-xl sm:text-2xl font-bold">{props.tabName}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg">3 Important message</button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                            Add Company
                        </button>
                        {isOpen && <AddCompanyModal isOpen={isOpen} setIsOpen={setIsOpen} />}
                    </div>
                </div>
            </div >
        </>
    )
}
