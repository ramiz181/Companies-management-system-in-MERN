

import CompaniesHeader from '../components/CompaniesHeader'
import CompaniesTab from '../components/CompaniesData'
import Sidebar from '../components/Sidebar'
import { useState } from 'react';


export default function CompanyPage() {
    const [isToggle, setIsToggle] = useState();

    return (
        <>
            <Sidebar widthState={isToggle} setIsToggle={setIsToggle} />
            <div className={`${isToggle ? 'ml-56' : 'ml-[60px]'} transition-all duration-300`}>
                <CompaniesHeader toggleSidebar={setIsToggle} tabName="Companies" />
                <CompaniesTab />
            </div>
        </>
    )
}
