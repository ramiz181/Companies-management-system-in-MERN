import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from './DashboardHeader';
import StatsCard from './StatsCard';
import '../styles/dashboard.css';

const DashboardPage = () => {
    // Sample stats data
    const stats = [
        { title: 'Total Companies', value: 124, icon: '🏢', trend: '↑ 12%' },
        { title: 'Active Companies', value: 98, icon: '✅', trend: '↑ 5%' },
        { title: 'Pending Approval', value: 12, icon: '⏳', trend: '↓ 3%' },
        { title: 'Suspended', value: 14, icon: '❌', trend: '↑ 2%' },
    ];

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <DashboardHeader title="Admin Dashboard" />
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>
                {/* Recent activity or other dashboard components can go here */}
            </div>
        </div>
    );
};

export default DashboardPage;