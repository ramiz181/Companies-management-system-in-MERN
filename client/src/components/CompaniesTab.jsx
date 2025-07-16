import { useState } from 'react';
import { FiSearch, FiFilter, FiEdit2, FiEye, FiChevronDown, FiX } from 'react-icons/fi';
import { companies } from '../Data/Data';


export default function CompaniesTab() {
    // Sample data


    // State for filters and search
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        industry: '',
        location: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Filter companies based on search and filters
    const filteredCompanies = companies.filter(company => {
        const matchesSearch =
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Object.values(company.contacts).some(contact =>
                contact.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesFilters =
            (filters.status === '' || company.status === filters.status) &&
            (filters.industry === '' || company.industry === filters.industry) &&
            (filters.location === '' || company.location === filters.location);

        return matchesSearch && matchesFilters;
    });

    // Status badge styling
    const getStatusBadge = (status) => {
        const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
        switch (status) {
            case 'Active':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'Inactive':
                return `${baseClasses} bg-red-100 text-red-800`;
            case 'Pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    // Handle filter change
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            status: '',
            industry: '',
            location: ''
        });
        setSearchTerm('');
    };

    // Close company details modal
    const closeModal = () => {
        setSelectedCompany(null);
        setIsEditMode(false);
    };




    return (

        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Companies</h1>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, ID, or keyword"
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <FiFilter />
                        <span>Filters</span>
                        {Object.values(filters).some(Boolean) && (
                            <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {Object.values(filters).filter(Boolean).length}
                            </span>
                        )}
                    </button>
                </div>

                {/* Filter Dropdown */}
                {showFilters && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4">
                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>

                            {/* Industry Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={filters.industry}
                                    onChange={(e) => handleFilterChange('industry', e.target.value)}
                                >
                                    <option value="">All Industries</option>
                                    {[...new Set(companies.map(c => c.industry))].map(industry => (
                                        <option key={industry} value={industry}>{industry}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                >
                                    <option value="">All Locations</option>
                                    {[...new Set(companies.map(c => c.location))].map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Filter Actions */}
                        <div className="flex justify-end mt-4 gap-2">
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Company List Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map((company) => (
                                    <tr key={company.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{company.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {Object.entries(company.contacts).map(([role, name]) => (
                                                    <div key={role}>{role}: {name}</div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.industry}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={getStatusBadge(company.status)}>
                                                {company.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(company.registrationDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => setSelectedCompany(company)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <FiEye className="inline mr-1" /> View
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedCompany(company);
                                                    setIsEditMode(true);
                                                }}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <FiEdit2 className="inline mr-1" /> Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No companies found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Company Details Modal */}
            {selectedCompany && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b p-4">
                            <h2 className="text-xl font-semibold">
                                {isEditMode ? 'Edit Company' : 'Company Details'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            {isEditMode ? (
                                <form>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCompany.name}
                                                className="w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company ID</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCompany.id}
                                                className="w-full border border-gray-300 rounded-md p-2"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCompany.industry}
                                                className="w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedCompany.location}
                                                className="w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <select
                                                defaultValue={selectedCompany.status}
                                                className="w-full border border-gray-300 rounded-md p-2"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
                                            <input
                                                type="date"
                                                defaultValue={selectedCompany.registrationDate}
                                                className="w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="font-medium text-lg mb-3">Key Contacts</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        {Object.entries(selectedCompany.contacts).map(([role, name]) => (
                                            <div key={role}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">{role}</label>
                                                <input
                                                    type="text"
                                                    defaultValue={name}
                                                    className="w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Company Name</h3>
                                            <p className="mt-1 text-sm text-gray-900">{selectedCompany.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Company ID</h3>
                                            <p className="mt-1 text-sm text-gray-900">{selectedCompany.id}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                                            <p className="mt-1 text-sm text-gray-900">{selectedCompany.industry}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Location</h3>
                                            <p className="mt-1 text-sm text-gray-900">{selectedCompany.location}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                            <p className="mt-1">
                                                <span className={getStatusBadge(selectedCompany.status)}>
                                                    {selectedCompany.status}
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {new Date(selectedCompany.registrationDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="font-medium text-lg mb-3">Key Contacts</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        {Object.entries(selectedCompany.contacts).map(([role, name]) => (
                                            <div key={role}>
                                                <h3 className="text-sm font-medium text-gray-500">{role}</h3>
                                                <p className="mt-1 text-sm text-gray-900">{name}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-end pt-4 border-t">
                                        <button
                                            onClick={() => setIsEditMode(true)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                                        >
                                            <FiEdit2 /> Edit Company
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
