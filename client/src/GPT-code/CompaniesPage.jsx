import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from './DashboardHeader';
import CompanyTable from './CompanyTable';
import AddCompanyModal from './AddCompanyModal';
import '../styles/dashboard.css';

const CompaniesPage = () => {
    const [companies, setCompanies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch companies (in a real app, this would be an API call)
    useEffect(() => {
        // Mock data
        const mockCompanies = [
            { id: 1, name: 'TechCorp', industry: 'Technology', status: 'Active', employees: 250, joined: '2023-01-15' },
            { id: 2, name: 'GreenEnergy', industry: 'Energy', status: 'Active', employees: 180, joined: '2023-02-20' },
            { id: 3, name: 'FoodDelight', industry: 'Food', status: 'Pending', employees: 45, joined: '2023-03-10' },
            { id: 4, name: 'BuildRight', industry: 'Construction', status: 'Suspended', employees: 120, joined: '2023-01-05' },
        ];
        setCompanies(mockCompanies);
    }, []);

    const handleAddCompany = (newCompany) => {
        setCompanies([...companies, { ...newCompany, id: companies.length + 1 }]);
        setIsModalOpen(false);
    };

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <DashboardHeader
                    title="Companies Management"
                    onAdd={() => setIsModalOpen(true)}
                    onSearch={setSearchTerm}
                    showAddButton={true}
                    showSearch={true}
                />
                <CompanyTable companies={filteredCompanies} />
                <AddCompanyModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddCompany}
                />
            </div>
        </div>
    );
};

export default CompaniesPage;