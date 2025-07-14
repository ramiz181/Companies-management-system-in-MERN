import React from 'react';

const StatsCard = ({ title, value, icon, trend }) => {
    return (
        <div className="stats-card">
            <div className="stats-icon">{icon}</div>
            <div className="stats-content">
                <h3>{title}</h3>
                <p className="stats-value">{value}</p>
                <p className="stats-trend">{trend}</p>
            </div>
        </div>
    );
};

export default StatsCard;