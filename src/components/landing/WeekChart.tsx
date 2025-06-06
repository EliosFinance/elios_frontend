import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const WeekChart = ({ className }: { className?: string }) => {
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
                backgroundColor: '#DDA853',
                borderColor: '#ccc',
                borderWidth: 1,
                textStyle: {
                    color: '#FFF',
                    fontWeight: 'bold',
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
                // if line cross 0, set color to red, else set to green
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: {
                    lineStyle: { color: '#eeeeeec1' },
                },
            },
            series: [
                {
                    name: 'Expenses',
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'line',
                    smooth: true,
                    // if line cross the data, set color to red, else set to green
                    lineStyle: {
                        color: '#FFF',
                        width: 2,
                    },
                    areaStyle: {
                        color: '#dda85347',
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
        <div className={`w-full mb-4 rounded-lg ${className}`}>
            <h2 className='mb-0 font-bold'>Last Week</h2>
            <div ref={chartRef} style={{ width: '100vw', height: '300px' }} className='-ml-6' />
        </div>
    );
};

export default WeekChart;
