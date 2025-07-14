import React from 'react';

const DashboardHeader = ({ title, onAdd, onSearch, showAddButton = false, showSearch = false }) => {
    return (
        <div className="dashboard-header">
            <h1>{title}</h1>
            <div className="header-actions">
                {showSearch && (
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search companies..."
                            onChange={(e) => onSearch(e.target.value)}
                        />
                        <button className="search-button">🔍</button>
                    </div>
                )}
                {showAddButton && (
                    <button onClick={onAdd} className="add-button">
                        + Add Company
                    </button>
                )}
            </div>
        </div>
    );
};

export default DashboardHeader;