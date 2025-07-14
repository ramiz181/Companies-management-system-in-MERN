import React from 'react'

import MyImage from './../assets/img/PayPal.png'

import { UserPlus, DollarSignIcon, LineChart, CalendarDaysIcon, CreditCard } from 'lucide-react';
import PayrollGraph from './PayrollGraph';
import { payrollIncrement } from '../Data/Data';
import Sidebar from './Sidebar';



export default function Test() {

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;



    return (
        <div>
            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg">3 Important message</button>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Add a request</button>
                    </div>
                </div>




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


                        {/* <div className="bg-green-100 p-3 rounded-lg mt-4">
                            <p className="text-sm font-medium">Review resume</p>
                            <p className="text-xs">Marketing team - 6</p>
                            <p className="text-xs">Product design - 10</p>
                        </div> */}
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
                                    <p className='text-sm text-gray-500'>Verified Account - <button className="text-sm text-blue-600">make it default Payout Method</button></p>
                                </div>
                            </div>
                            <p><span className='font-semibold'>Connection Date: </span>{formattedDate}</p>
                            

                        </div>


                    </div>

                </div>

                <div className='mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>

                    {/* Current Project */}
                    <div className="md:col-span-1 lg:col-span-1 bg-white p-4 rounded-xl shadow">
                        <h3 className="font-semibold mb-4">Current Project</h3>
                        <p className="text-sm">Project: <strong>SaaS Finance</strong></p>
                        <p className="text-xs text-green-500 mb-2">On progress</p>
                        <p className="text-sm">Manager: Devon Lane</p>
                        <p className="text-sm">Design Lead: Irma</p>
                        <p className="text-sm">Team: 6 people</p>
                        <p className="text-sm">Start: 1 Oct 2023</p>
                        <p className="text-sm">Due: 30 Oct 2023</p>
                    </div>

                    {/* Schedule */}
                    <div className="md:col-span-2 lg:col-span-2 bg-white p-4 rounded-xl shadow">
                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold">Employee Schedule</h3>
                            <button className="text-sm bg-purple-600 text-white px-3 py-1 rounded">Add schedule</button>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Team</th>
                                    <th>Period</th>
                                    <th>Shift</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td>Courtney Henry</td>
                                    <td>Server</td>
                                    <td>Oct 25 - Nov 15</td>
                                    <td>Night</td>
                                </tr>
                                <tr className="border-t">
                                    <td>Albert Flores</td>
                                    <td>Programmer</td>
                                    <td>Oct 25 - Nov 15</td>
                                    <td>Morning</td>
                                </tr>
                                <tr className="border-t">
                                    <td>Jerome Bell</td>
                                    <td>Designer</td>
                                    <td>Oct 25 - Nov 15</td>
                                    <td>Morning</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Employee List */}
                    <div className="md:col-span-1 lg:col-span-1 bg-white p-4 rounded-xl shadow">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">List Employee</h3>
                            <button className="text-xs text-purple-600">See more</button>
                        </div>
                        <ul className="text-sm space-y-2">
                            <li>Bessie Cooper - Product designer</li>
                            <li>Guy Hawkins - Product designer</li>
                            <li>Irma - Design lead</li>
                            <li>Devon Lane - Project manager</li>
                            <li>Courtney Henry - Server Engineer</li>
                        </ul>
                    </div>
                </div>


            </main >
        </div >
    )
}
