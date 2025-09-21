import { Link, useLocation } from 'react-router-dom';
import { Users, FileBarChart, Settings, ClipboardList, HelpCircle, Building2, LucideLayoutDashboard, PanelLeftIcon } from 'lucide-react';
import symbol from './../assets/img/dashboards/R-symbol.png'

export default function Sidebar(props) {
    const location = useLocation();

    const tabLinks = [
        { text: 'Overview', link: '/', icon: LucideLayoutDashboard },
        { text: 'Companies', link: '/company-overview', icon: Building2 },
        { text: 'Users (Global)', link: '#', icon: Users },
        { text: 'Reports', link: '#', icon: FileBarChart },
        { text: 'Settings', link: '#', icon: Settings },
        { text: 'Logs & Audit', link: '#', icon: ClipboardList },
        { text: 'Help & Support', link: '#', icon: HelpCircle },
    ];

    return (
        <aside
            // onMouseOver={() => props.setIsOpen(true)}
            // onMouseLeave={() => props.setIsOpen(false)}
            className={`bg-white shadow-md py-5 fixed h-screen inset-0 z-10 transition-all duration-300 
            ${props.widthState ? 'w-56' : 'w-[60px]'}
        `}
        >
            {/* <div className='absolute top-5 left-[40px] sm:top-4 md:top-[55px] bg-white shadow-md p-[5px] rounded border border-black-100'>
                <PanelLeftIcon className='w-4 h-4' />
            </div> */}
            {/* Sidebar Header */}
            <div className="flex items-center justify-center px-4 mb-10 relative">
                <img src={symbol} width="32px" />
                {props.widthState && <h1 className="text-2xl font-bold text-black">
                    RAMNITO</h1>}

            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col items-start justify-start gap-2">
                {tabLinks.map((item, idx) => {
                    const isActive = location.pathname === item.link;
                    const Icon = item.icon;
                    return (
                        <Link to={item.link} key={idx} className="w-full flex items-center">
                            <div
                                className={`w-[6px] h-10 rounded-r-3xl transition-all 
                  ${isActive ? 'bg-orange-600 border-l-4 border-red-500' : ''}`}
                            />
                            <div
                                className={`flex items-center hover:text-black gap-2 px-4 py-2 w-full  
                  ${isActive ? 'text-black font-medium' : 'text-gray-400 font-normal'}`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-orange-500' : ''}`} />
                                {props.widthState && <span>{item.text}</span>}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="mt-10 px-4">
                <button className="text-red-500">{props.widthState ? 'Logout' : <span className="text-xl">⏻</span>}</button>
            </div>
        </aside>
    );
}
