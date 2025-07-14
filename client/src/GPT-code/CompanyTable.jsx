import React from 'react';

const CompanyTable = ({ companies }) => {
    return (
        <div className="table-container">
            <table className="company-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Industry</th>
                        <th>Status</th>
                        <th>Employees</th>
                        <th>Joined Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.id}>
                            <td>{company.id}</td>
                            <td>{company.name}</td>
                            <td>{company.industry}</td>
                            <td>
                                <span className={`status-badge ${company.status.toLowerCase()}`}>
                                    {company.status}
                                </span>
                            </td>
                            <td>{company.employees}</td>
                            <td>{company.joined}</td>
                            <td>
                                <button className="action-button view">View</button>
                                <button className="action-button edit">Edit</button>
                                <button className="action-button delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyTable;