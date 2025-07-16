
const date = new Date();
const monthIndex = date.getMonth();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const monthName = [
    monthNames[monthIndex - 1],
    monthNames[monthIndex - 2],
    monthNames[monthIndex - 3],

]

const payrollData = {
    labels: [monthName[2], monthName[1], monthName[0]],
    datasets: [
        {
            label: 'Monthly Payroll ($) - last 3 months',
            data: [198000, 225000, 245000],
            borderColor: '#1F8ADE',
            backgroundColor: '#1F8ADE',
        },
    ],
};


// Sample data (soon replace with real API data)
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"];
const totalCompanies = [30, 75, 75, 100, 130, 160, 120, 200]; // Cumulative total
const newRegistrations = [110, 80, 45, 130, 60, 40, 100];   // New companies per month

const companiesGraphData = {
    labels: months,
    datasets: [
        {
            label: "Total Companies",
            data: totalCompanies,
            borderColor: "#3e95cd",
            backgroundColor: "rgba(62, 149, 205, 0.2)",
            tension: 0.3,
            fill: true,
        },
        {
            label: "New Registrations",
            data: newRegistrations,
            borderColor: "#8e5ea2",
            backgroundColor: "rgba(142, 94, 162, 0.2)",
            tension: 0.3,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: "Company Growth (2024)",
            font: { size: 16 },
        },
        legend: {
            position: "top",
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Number of Companies",
            },
        },
        x: {
            title: {
                display: true,
                text: "Months",
            },
        },
    },
};

const payrollIncrement = Math.round(((payrollData.datasets[0].data[2] - payrollData.datasets[0].data[0]) / payrollData.datasets[0].data[0]) * 10000) / 100;





const companies = [
    {
        id: 'COMP001',
        name: 'Tech Innovations Inc.',
        industry: 'Technology',
        location: 'San Francisco, CA',
        status: 'Active',
        contacts: {
            CEO: 'John Smith',
            Admin: 'Sarah Johnson'
        },
        registrationDate: '2022-01-15'
    },
    {
        id: 'COMP002',
        name: 'Green Energy Solutions',
        industry: 'Energy',
        location: 'Austin, TX',
        status: 'Pending',
        contacts: {
            CEO: 'Michael Brown',
            Admin: 'Emily Davis'
        },
        registrationDate: '2023-03-22'
    },
    {
        id: 'COMP003',
        name: 'Global Logistics',
        industry: 'Transportation',
        location: 'Chicago, IL',
        status: 'Inactive',
        contacts: {
            CEO: 'Robert Wilson',
            Admin: 'Jessica Lee'
        },
        registrationDate: '2021-11-05'
    },
    {
        id: 'COMP004',
        name: 'HealthPlus Medical',
        industry: 'Healthcare',
        location: 'Boston, MA',
        status: 'Active',
        contacts: {
            CEO: 'David Miller',
            Admin: 'Lisa Chen'
        },
        registrationDate: '2023-01-30'
    },
];


export { payrollData, payrollIncrement, companiesGraphData, options, companies }