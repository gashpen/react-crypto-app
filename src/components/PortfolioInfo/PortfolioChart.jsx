import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const PortfolioChart = () => {

    const assets = useSelector(state => state.crypto.userCrypto);
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {

        labels: assets.map((a)=> a.id),
        datasets: [
            {
                label: '$',
                data: assets.map((a)=>a.totalAmount),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ]
            },
        ],
    };
    return <div style={{
        display: 'flex',
        marginBottom: '1rem',
        justifyContent: 'center',
        height: 400
    }}>
        <Pie data={data} />
    </div>;
}

export default PortfolioChart;