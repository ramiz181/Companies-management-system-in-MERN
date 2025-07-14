
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { payrollData } from '../Data/Data';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default function PayrollGraph() {

    const options = {}
    // const data = {}

    return (
        <div>
            <Line options={options} data={payrollData} />
            {/* <Line options={options} data={payrollData} /> */}
        </div>
    )
}
