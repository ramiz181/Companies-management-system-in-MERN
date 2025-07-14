// import React from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//     return (
//         <div className="sidebar">
//             <div className="sidebar-header">
//                 <h2>Company Admin</h2>
//             </div>
//             <nav className="sidebar-nav">
//                 <ul>
//                     <li>
//                         <Link to="/" className="nav-link">
//                             <span className="nav-icon">📊</span>
//                             <span className="nav-text">Dashboard</span>
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/companies" className="nav-link active">
//                             <span className="nav-icon">🏢</span>
//                             <span className="nav-text">Companies</span>
//                         </Link>
//                     </li>
//                     <li>
//                         <a href="#" className="nav-link">
//                             <span className="nav-icon">👥</span>
//                             <span className="nav-text">Users</span>
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#" className="nav-link">
//                             <span className="nav-icon">⚙️</span>
//                             <span className="nav-text">Settings</span>
//                         </a>
//                     </li>
//                 </ul>
//             </nav>
//             <div className="sidebar-footer">
//                 <div className="user-profile">
//                     <div className="user-avatar">AD</div>
//                     <div className="user-info">
//                         <span className="user-name">Admin User</span>
//                         <span className="user-role">Super Admin</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;


import React from 'react'
import { Link } from 'react-router-dom'
import { FaBeer, FaHome, FaHouseUser } from "react-icons/fa";

export default function Sidebar() {

    const tabLinks = [
        { text: 'Overview', link: '/', icon: 'FaHome' },
        { text: 'Comapny ', link: 'comapny-overview' },

    ]

    return (
        <div>
            <aside className="w-64 bg-white shadow-md p-5 sticky top-0 h-screen">
                <h1 className="text-2xl font-bold text-purple-600 mb-10">Dashboard</h1>
                <nav className="space-y-4">
                    {tabLinks.map((item, idx) => (


                        < Link to={item.link} key={idx}>
                            <button
                                className={`flex w-full text-left px-3 py-2 rounded-lg hover:bg-purple-100 ${item === 'Overview' ? 'bg-purple-600 text-white' : 'text-gray-700'}`}>
                                <FaHome /> {item.text}
                            </button>
                        </Link>
                    ))}
                </nav>
                <button className="text-red-500 mt-10">Logout</button>
            </aside>
        </div >
    )
}
