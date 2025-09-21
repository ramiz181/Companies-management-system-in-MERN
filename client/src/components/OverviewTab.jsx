import React, { useState } from 'react';
import { UserPlus, DollarSign, CreditCard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data for PayrollGraph
const payrollData = [
    { month: 'Jan', amount: 200000 },
    { month: 'Feb', amount: 220000 },
    { month: 'Mar', amount: 210000 },
    { month: 'Apr', amount: 235000 },
    { month: 'May', amount: 245000 }
];

// Mock data for CompaniesGraph
const companiesData = [
    { month: 'Jan', companies: 45, employees: 1200 },
    { month: 'Feb', companies: 52, employees: 1350 },
    { month: 'Mar', companies: 48, employees: 1280 },
    { month: 'Apr', companies: 61, employees: 1520 },
    { month: 'May', companies: 58, employees: 1480 },
    { month: 'Jun', companies: 67, employees: 1680 }
];

const payrollIncrement = 8.5;

// Simple Calendar Component (since react-calendar isn't available)
const SimpleCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate();
        const isSelected = selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear;

        days.push(
            <button
                key={day}
                onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
                className={`p-2 text-sm rounded hover:bg-blue-50 transition-colors ${isToday ? 'bg-blue-500 text-white' : ''
                    } ${isSelected && !isToday ? 'bg-blue-100 text-blue-600' : ''}`}
            >
                {day}
            </button>
        );
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="w-full">
            <div className="mb-4 text-center">
                <h3 className="font-semibold text-lg">
                    {monthNames[currentMonth]} {currentYear}
                </h3>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days}
            </div>
        </div>
    );
};

const PayrollGraph = () => (
    <div className="h-24 mt-2">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={payrollData}>
                <Area type="monotone" dataKey="amount" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

const CompaniesGraph = () => (
    <div className="h-full">
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Companies Growth Overview</h3>
            <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Companies</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Employees</span>
                </div>
            </div>
        </div>
        <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={companiesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="companies" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="employees" stroke="#10b981" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default function OverviewTab() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

    return (
        <div className="w-full">
            {/* Main Content */}
            <main className="flex-1 p-3 sm:p-4 md:p-6">

                {/* First Row - Cards */}
                {/* sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 */}

                <div className="grid grid-cols-6 gap-4 md:gap-6">

                    {/* Newly Added Companies Card */}
                    {/* sm:col-span-2 xl:col-span-2 */}
                    <div className="col-span-6 md:col-span-3 lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm border transition-shadow hover:shadow-md">
                        <div className="mb-4">
                            <div className="flex gap-3 justify-start items-center mb-4">
                                <UserPlus className="text-blue-600 bg-blue-100 rounded-full p-2 flex-shrink-0" size={34} />
                                <h3 className="font-semibold text-sm sm:text-base">Newly Added Companies</h3>
                            </div>
                            <hr className="border-gray-200" />
                        </div>

                        <div className="space-y-4">
                            <div className="text-sm">
                                <p className="text-lg sm:text-xl font-bold">
                                    Comparison: <span className="text-green-500">+5%</span>
                                </p>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-sm font-medium mb-3">Total new companies</p>
                                <div className="space-y-1 text-xs sm:text-sm">
                                    <p>United States - 12</p>
                                    <p>Dubai - 09</p>
                                    <p>Pakistan - 04</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Payroll Card */}
                    {/* sm:col-span-2 xl:col-span-2 */}
                    <div className="col-span-6 md:col-span-3 lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm border transition-shadow hover:shadow-md">
                        <div className="mb-4">
                            <div className="flex gap-3 justify-start items-center mb-4">
                                <DollarSign className="text-green-600 bg-green-100 rounded-full p-2 flex-shrink-0" size={34} />
                                <h3 className="font-semibold text-sm sm:text-base">Monthly Payroll</h3>
                            </div>
                            <hr className="border-gray-200" />
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-xl sm:text-2xl font-bold">
                                    $245,000
                                    <span className="text-green-500 text-sm ml-2">+{payrollIncrement}%</span>
                                </p>
                                <p className="text-sm text-gray-500">Current month</p>
                            </div>
                            <div className="mt-4">
                                <PayrollGraph />
                            </div>
                        </div>
                    </div>

                    {/* Payment Account Card */}
                    {/* sm:col-span-2 lg:col-span-1 xl:col-span-3 */}
                    <div className="col-span-6 md:col-span-6 lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm border transition-shadow hover:shadow-md">
                        <div className="mb-4">
                            <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-4">
                                <div className="flex gap-3 justify-start items-center">
                                    <CreditCard className="text-blue-600 bg-blue-100 rounded-full p-2 flex-shrink-0" size={34} />
                                    <h3 className="font-semibold text-sm sm:text-base">Payment Account</h3>
                                </div>
                                <p className="bg-green-100 text-xs sm:text-sm text-green-600 rounded-full px-3 py-1 whitespace-nowrap">
                                    ✓ connected
                                </p>
                            </div>
                            <hr className="border-gray-200" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-5">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    PP
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm sm:text-lg font-semibold truncate">PayPal Digital Account</p>
                                    <p className="text-xs sm:text-sm text-gray-500">Verified Account</p>
                                    <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                        default payment method
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm">
                                <span className="font-semibold">Connection Date: </span>
                                <span className="text-gray-600">{formattedDate}</span>
                            </p>
                        </div>
                    </div>

                </div>


                {/* Second Row - Graph and Calendar */}
                <div className="grid grid-cols-6 gap-4 md:gap-6 mt-4 md:mt-6">

                    {/* Companies Graph */}
                    <div className="col-span-6 lg:col-span-4 bg-white p-4 md:p-6 rounded-xl shadow-sm border transition-shadow hover:shadow-md">
                        <CompaniesGraph />
                    </div>

                    {/* Calendar */}
                    <div className="col-span-6 lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm border transition-shadow hover:shadow-md">
                        <SimpleCalendar />
                    </div>
                </div>
            </main>
        </div>
    );
}