import React, { useState, useEffect, useRef } from 'react';

// Declare echarts on the window object
declare global {
  interface Window {
    echarts: any;
  }
}

type SubscriptionProps = {
  onBack: () => void;
  onToggleVisibility: () => void;
};

const Subscription: React.FC<SubscriptionProps> = ({ onBack, onToggleVisibility }) => {
  const [period, setPeriod] = useState('Monthly');
  const [expenses, setExpenses] = useState([
    { icon: '🎨', name: 'Dribbble Pro', amount: '$160' },
    { icon: '🎵', name: 'Spotify', amount: '$160' },
    { icon: '💬', name: 'Slack', amount: '$160' },
    { icon: '🎨', name: 'Dribbble Pro', amount: '$160' },
    { icon: '🎵', name: 'Spotify', amount: '$160' },
    { icon: '💬', name: 'Slack', amount: '$160' },
  ]);

  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeChart = () => {
      if (chartRef.current && window.echarts) {
        const chartInstance = window.echarts.init(chartRef.current);

        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: '#4A90E2',
                width: 2,
              },
            },
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
            top: '20%',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Octobre', 'Novembre', 'Décembre'],
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
            axisLabel: {
              fontSize: 12,
              color: '#333',
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: '#eee',
              },
            },
            axisLabel: {
              fontSize: 12,
              color: '#333',
            },
          },
          series: [
            {
              data: [100, 200, 150, 300, 250],
              type: 'line',
              smooth: true,
              lineStyle: {
                color: '#4A90E2',
                width: 3,
              },
              areaStyle: {
                color: 'rgba(74, 144, 226, 0.2)',
              },
              symbol: 'circle',
              symbolSize: 8,
              itemStyle: {
                color: '#4A90E2',
              },
            },
          ],
        };

        chartInstance.setOption(option);

        return () => {
          chartInstance.dispose();
        };
      }
    };

    const interval = setInterval(() => {
      if (window.echarts) {
        initializeChart();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [period]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <button onClick={onBack} className="text-2xl">←</button>
        <button onClick={onToggleVisibility} className="text-2xl">👁️</button>
      </div>

      {/* Main content section */}
      <div className="flex-1 flex flex-col items-center px-4 md:px-8 lg:px-16">
        {/* Graph Section */}
        <div className="w-full max-w-3xl mb-10">
          <h2 className="text-lg font-semibold mb-2 md:text-xl lg:text-2xl">Evolution globale</h2>
          <p className="text-gray-500 text-sm mb-4 md:text-base">Nov 1, 2020 - Nov 30, 2020</p>
          <div className="flex items-center justify-end mb-4">
            <span className="text-gray-400 mr-2">Période :</span>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm md:text-base"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>
          {/* Graph */}
          <div ref={chartRef} className="w-full h-64 bg-gray-100 rounded-lg md:h-80 lg:h-96"></div>
        </div>

        {/* Expenses Section */}
        <div className="w-full max-w-3xl">
          <h2 className="text-lg font-semibold mt-4 mb-2 md:text-xl lg:text-2xl">Vos dépenses récurrentes</h2>
          <p className="text-gray-500 text-sm mb-4 md:text-base">Novembre 2021</p>
          <div className="max-h-60 overflow-y-auto space-y-4 md:max-h-80 lg:max-h-96">
            {expenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-2 md:px-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full mr-3 md:w-12 md:h-12">
                    <span className="text-lg md:text-xl">{expense.icon}</span>
                  </div>
                  <span className="text-sm md:text-base lg:text-lg">{expense.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm md:text-base lg:text-lg">{expense.amount}</p>
                  <p className="text-gray-500 text-xs md:text-sm">Monthly</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;