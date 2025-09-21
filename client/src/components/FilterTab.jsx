import React from 'react'



const [filters, setFilters] = useState({
    status: "",
    industry: "",
    location: "",
});

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

const [showFilters, setShowFilters] = useState(false);


export default function FilterTab() {
    return (
        <div>
            -{/* Search + Filters */}
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
        </div>
    )
}
