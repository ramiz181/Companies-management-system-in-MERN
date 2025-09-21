
import Sidebar from '../components/Sidebar'
import CompaniesHeader from '../components/CompaniesHeader'
import OverviewTab from '../components/OverviewTab'
import { useState } from 'react';

export default function OverviewPage() {
    const [isToggle, setIsToggle] = useState();

    return (
        <>
            <Sidebar widthState={isToggle} setIsOpen={setIsToggle} />
            <div className={`${isToggle ? 'ml-56' : 'ml-[60px]'} transition-all duration-300`}>
                <CompaniesHeader toggleSidebar={setIsToggle} tabName="Overview" />
                <OverviewTab />
            </div>
        </>
    )
}