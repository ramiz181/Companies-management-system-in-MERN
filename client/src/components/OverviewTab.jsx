
import MyImage from './../assets/img/PayPal.png'

import Calendar from 'react-calendar';

import { UserPlus, DollarSignIcon, LineChart, CalendarDaysIcon, CreditCard } from 'lucide-react';
import PayrollGraph from './PayrollGraph';
import { payrollIncrement } from '../Data/Data';
import CompaniesGraph from './CompaniesGraph';
import { useState } from 'react'



export default function OverviewTab() {


    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;


    const [calendarDate, setCalendarDate] = useState(new Date());


    return (
        <div>
            {/* Main Content */}
            <main className="flex-1 p-6">

                {/* Grid Layout */}

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">


                    {/* Duties */}
                    <div className="md:col-span-2 lg:col-span-2 bg-white p-4 rounded-xl shadow flex flex-col justify-between">

                        <div className='mb-4'>
                            <div className='flex gap-3 justify-start items-center mb-4'>
                                <UserPlus className=' text-blue-600 bg-blue-100 rounded-full p-2' size={34} />
                                <h3 className="font-semibold">Newly added Companies</h3>
                            </div>
                            <hr />
                        </div>

                        <div>
                            <div className="text-sm mb-3">
                                <p className='text-xl font-bold'>Comparison: <span className='text-green-500'>+5%</span></p>
                            </div>

                            <div className="bg-blue-100 p-3 rounded-lg">
                                <p className="text-sm font-medium">Total new companies</p>
                                <p className="mt-3 text-xs">United States - 12</p>
                                <p className="text-xs">Dubai - 09</p>
                                <p className="text-xs">Pakistan - 04</p>
                            </div>
                        </div>


                    </div>

                    {/* Profit */}
                    <div className="md:col-span-2 lg:col-span-2 bg-white p-4 rounded-xl shadow flex flex-col justify-between">

                        <div className='mb-4'>
                            <div className='flex gap-3 justify-start items-center mb-4'>
                                <DollarSignIcon className=' text-green-600 bg-green-100 rounded-full p-2' size={34} />
                                <h3 className="font-semibold">Monthly Payroll</h3>
                            </div>
                            <hr />
                        </div>

                        <div>
                            <p className="text-2xl font-bold">$245,000 <span className="text-green-500 text-sm">+{payrollIncrement}%</span></p>

                            <p className="text-sm text-gray-500">Current month</p>
                            <div>
                                <PayrollGraph />
                            </div>
                        </div>
                    </div>

                    {/* Server Status */}
                    <div className="md:col-span-1 lg:col-span-3 bg-white p-4 rounded-xl shadow">

                        <div className='mb-4'>
                            <div className='flex gap-3 justify-between items-center mb-4'>
                                <div className='flex gap-3 justify-start items-center'>
                                    <CreditCard className=' text-blue-600 bg-blue-100 rounded-full p-2' size={34} />
                                    <h3 className="font-semibold">Payment Account</h3>
                                </div>
                                <p className='bg-green-100 text-sm text-green-600 rounded-3xl pt-1 pb-1 pl-2 pr-2'>&#10003; connected</p>
                            </div>
                            <hr />
                        </div>

                        <div className="flex flex-col justify-start items-start gap-3">
                            <div className='flex justify-center items-center gap-5'>
                                <img src={MyImage} width='30px' alt="" />
                                <div>
                                    <p className='text-xl font-semibold'>PayPal Digital Account</p>
                                    <p className='text-sm text-gray-500'>Verified Account - </p>
                                    <button className="text-sm text-blue-600">default payment method</button>
                                </div>
                            </div>
                            <p><span className='font-semibold'>Connection Date: </span>{formattedDate}</p>


                        </div>


                    </div>

                </div>


                {/* Grid Layout */}

                <div className='mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6'>

                    {/* Current Project */}

                    <div className='md:col-span-2 lg:col-span-5 bg-white p-4 rounded-xl shadow'>
                        <CompaniesGraph />
                    </div>


                    <div className='md:col-span-1 lg:col-span-2 bg-white p-4 rounded-xl shadow'>
                        <Calendar onChange={calendarDate => setCalendarDate(calendarDate)} value={calendarDate} />
                    </div>
                </div>


            </main >
        </div >
    )
}
