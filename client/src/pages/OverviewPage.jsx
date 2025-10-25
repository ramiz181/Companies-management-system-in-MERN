import Sidebar from '../components/Sidebar'
import CompaniesHeader from '../components/CompaniesHeader'
import OverviewTab from '../components/OverviewTab'
import { ToggleContext } from '.././context/toggleContext'
import { useContext } from 'react';

export default function OverviewPage() {

    const toggleState = useContext(ToggleContext)
    return (
        <>
            <Sidebar />
            <div className={`${toggleState.isToggle ? 'ml-56' : 'ml-[60px]'} transition-all duration-300`}>
                <CompaniesHeader tabName="Overview" />
                <OverviewTab />
            </div>
        </>
    )
}