import { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiEdit2, FiEye, FiX } from "react-icons/fi";
import { companies } from "../Data/Data";

export default function CompaniesTab() {
    const [searchTerm, setSearchTerm] = useState("");
    const [companiesData, setCompaniesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        status: "",
        industry: "",
        location: "",
    });

    const [showFilters, setShowFilters] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formData, setFormData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    // Filtering logic
    const filteredCompanies = companies.filter((company) => {
        const matchesSearch =
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Object.values(company.contacts).some((contact) =>
                contact.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesFilters =
            (filters.status === "" || company.status === filters.status) &&
            (filters.industry === "" || company.industry === filters.industry) &&
            (filters.location === "" || company.location === filters.location);

        return matchesSearch && matchesFilters;
    });

    // Status badge styling
    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case "Active":
                return `${baseClasses} bg-green-100 text-green-800`;
            case "Inactive":
                return `${baseClasses} bg-red-100 text-red-800`;
            case "Pending":
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const handleFilterChange = (filterName, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterName]: value,
        }));
    };

    const resetFilters = () => {
        setFilters({
            status: "",
            industry: "",
            location: "",
        });
        setSearchTerm("");
    };

    const closeModal = () => {
        setSelectedCompany(null);
        setIsEditMode(false);
        setFormData(null);
    };

    // Fetch data from backend
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetch(`${API_URL}/api/getData`);
                const data = await res.json();
                setCompaniesData(data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    // Handle form field changes
    const handleChangeData = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Update company in DB
    const handleUpdateData = async (dataID) => {
        try {
            const response = await fetch(`${API_URL}/api/updateData/${dataID}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update company");

            const updatedCompany = await response.json();

            setCompaniesData((prev) =>
                prev.map((c) => (c._id === updatedCompany._id ? updatedCompany : c))
            );

            closeModal();
        } catch (error) {
            console.log("Error updating companies", error);
        }
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                Companies
            </h1>

            {/* Search + Filters */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Search */}
                    <div className="relative w-full md:w-2/3">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, ID, or keyword"
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm md:text-base"
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={filters.status}
                                    onChange={(e) =>
                                        handleFilterChange("status", e.target.value)
                                    }
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>

                            {/* Industry */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Industry
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={filters.industry}
                                    onChange={(e) =>
                                        handleFilterChange("industry", e.target.value)
                                    }
                                >
                                    <option value="">All Industries</option>
                                    {[...new Set(companies.map((c) => c.industry))].map(
                                        (industry) => (
                                            <option key={industry} value={industry}>
                                                {industry}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={filters.location}
                                    onChange={(e) =>
                                        handleFilterChange("location", e.target.value)
                                    }
                                >
                                    <option value="">All Locations</option>
                                    {[...new Set(companies.map((c) => c.location))].map(
                                        (location) => (
                                            <option key={location} value={location}>
                                                {location}
                                            </option>
                                        )
                                    )}
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


            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    "Company Name",
                                    "Industry",
                                    "Location",
                                    "Status",
                                    "Registration Date",
                                    "Actions",
                                ].map((header) => (
                                    <th
                                        key={header}
                                        className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {companiesData.length > 0 ? (
                                companiesData.map((company) => (
                                    
                                    <tr key={company._id} className="hover:bg-gray-50">
                                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm">
                                            <div className="font-medium text-gray-900">
                                                {company.companyName}
                                            </div>
                                            <div className="text-gray-500">
                                                <div>ID: {company.companyID}</div>
                                                <div>CEO: {company.ceo}</div>
                                            </div>
                                        </td>
                                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                                            {company.departments}
                                        </td>
                                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                                            {company.location?.city}, {company.location?.country}
                                        </td>
                                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
                                            <span className={getStatusBadge(company.status)}>
                                                {company.status}
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                                            {new Date(company.registerDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium">
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
                                                    setFormData({
                                                        companyName: company.companyName,
                                                        companyID: company.companyID,
                                                        employees: company.employees,
                                                        departments: company.departments,
                                                        location: {
                                                            city: company.location?.city || "",
                                                            country: company.location?.country || "",
                                                        },
                                                        status: company.status,
                                                        registerDate: company.registerDate,
                                                        ceo: company.ceo,
                                                        website: company.website,
                                                        email: company.email,
                                                        phone: company.phone,
                                                    });
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
                                    <td
                                        colSpan="7"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        No companies found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {selectedCompany && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-2xl h-full sm:h-auto max-h-[95vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b p-3 sm:p-4">
                            <h2 className="text-lg sm:text-xl font-semibold">
                                {isEditMode ? "Edit Company" : "Company Details"}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={20} className="sm:size-6" />
                            </button>
                        </div>

                        <div className="p-3 sm:p-6">
                            {isEditMode ? (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdateData(selectedCompany._id);
                                    }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={formData?.companyName || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Company ID
                                            </label>
                                            <input
                                                type="text"
                                                name="companyID"
                                                value={formData?.companyID || ""}
                                                disabled
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Employees
                                            </label>
                                            <input
                                                type="text"
                                                name="employees"
                                                value={formData?.employees || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Industry
                                            </label>
                                            <input
                                                type="text"
                                                name="departments"
                                                value={formData?.departments || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="location.city"
                                                value={formData?.location?.city || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                name="location.country"
                                                value={formData?.location?.country || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData?.status || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Registration Date
                                            </label>
                                            <input
                                                type="date"
                                                name="registerDate"
                                                value={
                                                    formData?.registerDate
                                                        ? formData.registerDate.slice(0, 10)
                                                        : ""
                                                }
                                                disabled
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="font-medium text-lg mb-3">Key Contacts</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CEO
                                            </label>
                                            <input
                                                type="text"
                                                name="ceo"
                                                value={formData?.ceo || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Website
                                            </label>
                                            <input
                                                type="text"
                                                name="website"
                                                value={formData?.website || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                value={formData?.email || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData?.phone || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                                            />
                                        </div>
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
                                            <h3 className="text-md font-medium text-gray-500">
                                                Company Name
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {selectedCompany.companyName}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-gray-500">
                                                Company ID
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {selectedCompany.companyID}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-gray-500">
                                                Industry
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {selectedCompany.departments}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-gray-500">
                                                Location
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {selectedCompany.location?.city},{" "}
                                                {selectedCompany.location?.country}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-gray-500">
                                                Status
                                            </h3>
                                            <p className="mt-1">
                                                <span className={getStatusBadge(selectedCompany.status)}>
                                                    {selectedCompany.status}
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-gray-500">
                                                Timestamps
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-900">
                                                <strong className="font-normal">Registration: </strong>
                                                {new Date(selectedCompany.registerDate).toLocaleDateString()}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900">
                                                <strong className="font-normal">Last Update: </strong>
                                                {new Date(selectedCompany.updatedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="font-medium text-lg mb-3">Key Contacts</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <h3 className="text-md font-medium text-gray-500">CEO</h3>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {selectedCompany.ceo}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-gray-500">
                                                Website
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {selectedCompany.website}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-gray-500">
                                                Admin
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-900">
                                                <strong className="font-bold text-gray-600">Email: </strong>
                                                {selectedCompany.email}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900">
                                                <strong className="font-bold text-gray-600">Phone: </strong>
                                                {selectedCompany.phone}
                                            </p>
                                        </div>
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
}
