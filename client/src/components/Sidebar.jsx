import { Link, useLocation } from 'react-router-dom'
import { BarChart4 } from 'lucide-react';

export default function Sidebar() {

    const location = useLocation();

    const tabLinks = [
        { text: 'Overview', link: '/' },
        { text: 'Comapnies ', link: '/company-overview' },

    ]

    return (
        <div>
            <aside className="w-64 bg-white shadow-md p-5 sticky top-0 h-screen">
                <h1 className="text-2xl font-bold text-blue-600 mb-10">Dashboard</h1>

                <nav className="flex flex-col items-start justify start gap-4">

                    {tabLinks.map((item, idx) => {


                        const isActive = location.pathname === item.link

                        return (
                            < Link to={item.link} key={idx} className='w-full'>
                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'}`} >

                                    <BarChart4 />
                                    <span>{item.text}</span>
                                </div>
                            </Link>
                        )
                    })}
                </nav>

                <button className="text-red-500 mt-10">Logout</button>
            </aside>
        </div >
    )
}
