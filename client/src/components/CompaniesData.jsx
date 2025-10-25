import { useState, useEffect } from "react";
import { FiEdit2, FiEye, FiX } from "react-icons/fi";

export default function CompaniesTab() {
    const [companiesData, setCompaniesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formData, setFormData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    // status badge styling helper
    const getStatusBadge = (status) => {
        const base = "px-2 py-1 rounded-full text-xs font-medium";
        const styles = {
            Active: "bg-green-100 text-green-800",
            Inactive: "bg-red-100 text-red-800",
            Pending: "bg-yellow-100 text-yellow-800",
        };
        return `${base} ${styles[status] || "bg-gray-100 text-gray-800"}`;
    };

    // modal close karne ka helper
    const closeModal = () => {
        setSelectedCompany(null);
        setIsEditMode(false);
        setFormData(null);
    };

    // data fetch from backend
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                const res = await fetch(`${API_URL}/api/getData`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();
                setCompaniesData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };
        fetchCompanies();
    }, []);

    // form input change handle karna
    const handleChangeData = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // company update
    const handleUpdateData = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/updateData/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Update failed");
            const updated = await response.json();

            setCompaniesData((prev) =>
                prev.map((c) => (c._id === updated._id ? updated : c))
            );
            closeModal();
        } catch (err) {
            console.error("Error updating companies:", err);
        }
    };

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading companies...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            {/* table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                        <thead className="bg-gray-50">
                            <tr>
                                {["Company Name", "Industry", "Location", "Status", "Registration Date", "Actions"].map(
                                    (header) => (
                                        <th
                                            key={header}
                                            className="px-4 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase"
                                        >
                                            {header}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {companiesData.length > 0 ? (
                                companiesData.map((company) => (
                                    <tr key={company._id} className="hover:bg-gray-50">
                                        <td className="px-4 md:px-6 py-3">
                                            <div className="font-medium text-gray-900">
                                                {company.companyName}
                                            </div>
                                            <div className="text-gray-500 text-sm">
                                                <div>ID: {company.companyID}</div>
                                                <div>CEO: {company.ceo}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 text-gray-500">
                                            {company.departments}
                                        </td>
                                        <td className="px-4 md:px-6 py-3 text-gray-500">
                                            {company.location?.city}, {company.location?.country}
                                        </td>
                                        <td className="px-4 md:px-6 py-3">
                                            <span className={getStatusBadge(company.status)}>{company.status}</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 text-gray-500">
                                            {new Date(company.registerDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 md:px-6 py-3 font-medium">
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
                                                    setFormData({ ...company });
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
                                        colSpan="6"
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No companies found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit, view modal */}
            {selectedCompany && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b p-4">
                            <h2 className="text-lg md:text-xl font-semibold">
                                {isEditMode ? "Edit Company" : "Company Details"}
                            </h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="p-4 md:p-6">
                            {isEditMode ? (
                                // input fields...edit mode
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdateData(selectedCompany._id);
                                    }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { label: "Company Name", name: "companyName" },
                                            { label: "Company ID", name: "companyID", disabled: true },
                                            { label: "Employees", name: "employees" },
                                            { label: "Industry", name: "departments" },
                                            { label: "City", name: "location.city" },
                                            { label: "Country", name: "location.country" },
                                        ].map(({ label, name, disabled }) => (
                                            <div key={name}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    {label}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={name}
                                                    disabled={disabled}
                                                    value={formData?.[name.split(".")[0]]?.[name.split(".")[1]] || formData?.[name] || ""}
                                                    onChange={handleChangeData}
                                                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                />
                                            </div>
                                        ))}

                                        {/* Status select */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData?.status || ""}
                                                onChange={handleChangeData}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
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

                                    <h3 className="font-medium text-lg">Key Contacts</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {["ceo", "website", "email", "phone"].map((field) => (
                                            <div key={field}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                                    {field}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={field}
                                                    value={formData?.[field] || ""}
                                                    onChange={handleChangeData}
                                                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
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
                                // view mode
                                <div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <h3 className="text-md font-medium text-black">Company Name</h3>
                                            <p className="mt-1 text-gray-900">{selectedCompany.companyName}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-black">Company ID</h3>
                                            <p className="mt-1 text-gray-900">{selectedCompany.companyID}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-black">Industry</h3>
                                            <p className="mt-1 text-gray-900">{selectedCompany.departments}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-black">Location</h3>
                                            <p className="mt-1 text-gray-900">
                                                {selectedCompany.location?.city}, {selectedCompany.location?.country}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-black">Status</h3>
                                            <span className={getStatusBadge(selectedCompany.status)}>
                                                {selectedCompany.status}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-black">
                                                Timestamps
                                            </h3>
                                            <p className="mt-1 text-gray-900">
                                                <span className="font-medium">Registration: </span>
                                                {new Date(selectedCompany.registerDate).toLocaleDateString()}
                                            </p>
                                            <p className="mt-1 text-gray-900">
                                                <span className="font-medium">Last Update: </span>
                                                {new Date(selectedCompany.updatedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-semibold mb-3">Key Contacts</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-md font-medium text-black">CEO</h3>
                                            <p className="mt-1 text-gray-900">{selectedCompany.ceo}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-black">Website</h3>
                                            <p className="mt-1 text-gray-900"><a href={selectedCompany.website} target="_blank">{selectedCompany.website}</a></p>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-black">Admin</h3>
                                            <p className="mt-1 text-gray-900">
                                                <span className="font-medium">Email:</span> {selectedCompany.email}
                                            </p>
                                            <p className="mt-1 text-gray-900">
                                                <span className="font-medium">Phone:</span> {selectedCompany.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4 border-t">
                                        <button
                                            onClick={() => {
                                                setIsEditMode(true);
                                                setFormData({ ...selectedCompany });
                                            }}
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
            )
            }
        </div >
    );
}
