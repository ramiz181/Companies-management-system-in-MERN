
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

const payrollIncrement = Math.round(((payrollData.datasets[0].data[2] - payrollData.datasets[0].data[0]) / payrollData.datasets[0].data[0]) * 10000) / 100;



export { payrollData, payrollIncrement }