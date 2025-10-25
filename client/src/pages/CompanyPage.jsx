import CompaniesHeader from '../components/CompaniesHeader'
import CompaniesTab from '../components/CompaniesData'
import Sidebar from '../components/Sidebar'
import { useContext } from 'react';
import { ToggleContext } from '../context/toggleContext';

export default function CompanyPage() {

    const toggleState = useContext(ToggleContext)
    return (
        <>
            <Sidebar />
            <div className={`${toggleState.isToggle ? 'ml-56' : 'ml-[60px]'} transition-all duration-300`}>
                <CompaniesHeader tabName="Companies" />
                <CompaniesTab />
            </div>
        </>
    )
}