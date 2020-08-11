import React, { useEffect, useState } from 'react';
import ChartMogul from 'chartmogul-node';
import { Line } from 'react-chartjs-2';

import './App.css';

const config = new ChartMogul.Config('a1d79f5960cc53f29766af38dfbf6fd0', '045a5205037e27c69fcac7da045a1d63');

const defaultLineData = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Total MRR',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0,0,0,0]
    }
  ]
}

function App() {
  const [mrr, setMrr] = useState([0,0,0,0])
  const [lineData, setLineData] = useState(defaultLineData)

  useEffect(() => {
    const clonedLineData = Object.assign({}, defaultLineData);
    clonedLineData.datasets[0].data = mrr;
    setLineData(clonedLineData);
  }, [mrr])

  useEffect(() => {
    ChartMogul.Metrics.all(config, {
      'start-date': '2019-01-01',
      'end-date': '2019-04-30',
      'interval': 'month'
    })
    .then(res => {
      const mrr = res.entries.map(r => r.mrr / 100);
      setMrr(mrr);
    })
    .catch(e => console.error(e.message, e.httpStatus, e.response));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Company MRR for Q1 2019
        </p>
        <div className="chart-container">
          <Line data={lineData} />
        </div>
      </header>
    </div>
  );
}

export default App;
