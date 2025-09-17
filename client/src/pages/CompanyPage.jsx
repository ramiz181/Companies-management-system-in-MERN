
import AddCompanyModal from '../components/AddCompanyModal'
import CompaniesHeader from '../components/CompaniesHeader'
import CompaniesTab from '../components/CompaniesData'
import Sidebar from '../components/Sidebar'

export default function CompanyOverview() {
    return (
        <div>
            <Sidebar />
            <CompaniesHeader />
            {/* <AddCompanyModal /> */}
            <CompaniesTab />
        </div>
    )
}
