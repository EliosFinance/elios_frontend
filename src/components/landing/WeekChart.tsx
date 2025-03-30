import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const WeekChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const getLastSevenDays = () => {
            const dates = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                dates.push(date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }));
            }
            return dates;
        };

        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: '{c0} $',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: '#ccc',
                borderWidth: 1,
                textStyle: {
                    color: '#000',
                },
            },
            xAxis: {
                type: 'category',
                data: getLastSevenDays(),
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: '#999' },
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { lineStyle: { color: '#eee' } },
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        color: '#000',
                        width: 2,
                    },
                    areaStyle: {
                        color: 'rgba(50, 168, 82, 0.1)',
                    },
                    markPoint: {
                        data: [{ type: 'max', name: 'Max', symbol: 'circle', symbolSize: 8, label: { show: false } }],
                    },
                },
            ],
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, []);

    return (
        <div className='w-full mb-4 bg-white rounded-lg'>
            <h2 className='mb-4 text-xl font-bold'>Last Week</h2>
            <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
        </div>
    );
};

export default WeekChart;
