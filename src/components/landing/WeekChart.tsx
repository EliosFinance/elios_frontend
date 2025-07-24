import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const WeekChart = ({ className }: { className?: string }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const getLastSevenDays = () => {
            const dates = [];
            const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dayName = days[date.getDay() === 0 ? 6 : date.getDay() - 1];
                const dayNum = date.toLocaleDateString('fr-FR', { day: '2-digit' });
                dates.push(`${dayName} ${dayNum}`);
            }
            return dates;
        };

        // Données réalistes d'étudiant français (dépenses négatives)
        const weeklyExpenses = [-45.20, -32.10, -67.85, -28.50, -89.40, -156.30, -78.90];
        const maxExpense = Math.max(...weeklyExpenses.map(Math.abs));

        const option = {
            title: {
                text: 'Dépenses de la semaine',
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: 'bold'
                },
                top: 10,
                left: 20
            },
            legend: {
                data: ['Dépenses quotidiennes'],
                top: 40,
                left: 20,
                textStyle: {
                    color: '#CCCCCC',
                    fontSize: 12
                },
                icon: 'circle'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    const value = Math.abs(params[0].value);
                    return `${params[0].axisValue}<br/>Dépenses: ${value.toFixed(2)}€`;
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: '#DDA853',
                borderWidth: 1,
                textStyle: {
                    color: '#FFF',
                    fontWeight: 'bold',
                },
            },
            grid: {
                top: 80,
                left: 40,
                right: 40,
                bottom: 40,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: getLastSevenDays(),
                axisLine: { 
                    show: true,
                    lineStyle: { color: '#555' }
                },
                axisTick: { show: false },
                axisLabel: { 
                    color: '#CCCCCC',
                    fontSize: 11,
                    rotate: 0
                },
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { 
                    show: true,
                    color: '#CCCCCC',
                    fontSize: 10,
                    formatter: function(value) {
                        return Math.abs(value) + '€';
                    }
                },
                splitLine: {
                    lineStyle: { 
                        color: '#333333',
                        type: 'dashed'
                    },
                },
                min: Math.min(...weeklyExpenses) - 20,
                max: 0
            },
            series: [
                {
                    name: 'Dépenses quotidiennes',
                    data: weeklyExpenses,
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: {
                        color: '#DDA853',
                        width: 3,
                    },
                    itemStyle: {
                        color: '#DDA853',
                        borderColor: '#FFF',
                        borderWidth: 2
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(221, 168, 83, 0.4)'
                            }, {
                                offset: 1, color: 'rgba(221, 168, 83, 0.1)'
                            }]
                        }
                    },
                    markPoint: {
                        data: [
                            { 
                                type: 'max', 
                                name: 'Pic de dépenses', 
                                symbol: 'pin', 
                                symbolSize: 50,
                                itemStyle: {
                                    color: '#FF6B6B'
                                },
                                label: { 
                                    show: true,
                                    formatter: function(params) {
                                        return Math.abs(params.value) + '€';
                                    },
                                    color: '#FFFFFF',
                                    fontSize: 10,
                                    fontWeight: 'bold'
                                }
                            }
                        ],
                    },
                    markLine: {
                        data: [
                            {
                                type: 'average',
                                name: 'Moyenne',
                                lineStyle: {
                                    color: '#4ECDC4',
                                    type: 'dashed',
                                    width: 2
                                },
                                label: {
                                    formatter: function(params) {
                                        return 'Moy: ' + Math.abs(params.value).toFixed(0) + '€';
                                    },
                                    color: '#4ECDC4'
                                }
                            }
                        ]
                    }
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
            <h2 className='mb-0 text-xl font-bold'>La semaine dernière</h2>
            <div ref={chartRef} style={{ width: '100vw', height: '300px' }} className='-ml-6' />
        </div>
    );
};

export default WeekChart;
