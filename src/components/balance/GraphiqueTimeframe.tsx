import { useGetTransactions } from '@/api';
import { instance_back } from '@/api/const';
import { userStore } from '@/store/UserStore';
import { ConnectionType } from '@/types/connectionType';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import { ChartSkeleton } from '../ChartSkeleton';

export interface GraphiqueTimeframeProps {
    timeframe: 'day' | 'week' | 'month';
    onTimeframeChange: (newTimeframe: 'day' | 'week' | 'month') => void;
    onDateSelected: (date: Date) => void;
    total: number;
    connections: ConnectionType[];
}

const GraphiqueTimeframe: React.FC<GraphiqueTimeframeProps> = ({
    timeframe,
    onTimeframeChange,
    onDateSelected,
    total,
    connections = [],
}) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [xAxisData, setXAxisData] = useState<string[]>([]);
    const [seriesData, setSeriesData] = useState<number[]>([]);
    // const { data: transactions, isLoading, isFetching } = useGetTransactions(connections);
    const isLoading = false;
    const isFetching = false;
    
    useEffect(() => {
        // Données hardcodées réalistes pour un étudiant français
        if (timeframe === 'day') {
            setXAxisData(['08h', '12h', '16h', '20h']);
            setSeriesData([-4.50, -8.90, -23.45, -12.80]); // Petit-déj, déjeuner, courses, dîner
        } else if (timeframe === 'week') {
            setXAxisData(['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']);
            setSeriesData([-45.20, -32.10, -67.85, -28.50, -89.40, -156.30, -78.90]); // Dépenses hebdomadaires étudiant
        } else if (timeframe === 'month') {
            setXAxisData(['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4']);
            setSeriesData([-198.25, -167.80, -145.60, -89.50]); // Dépenses mensuelles progressives
        }
    }, [timeframe]);

    useEffect(() => {
        if (!chartRef.current || isFetching || isLoading) return;
        const chartInstance = echarts.init(chartRef.current);
        
        const getTimeframeLabel = () => {
            switch(timeframe) {
                case 'day': return 'Dépenses par heure';
                case 'week': return 'Dépenses hebdomadaires'; 
                case 'month': return 'Dépenses mensuelles';
                default: return 'Dépenses';
            }
        };

        const option = {
            title: {
                text: getTimeframeLabel(),
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: 'bold'
                },
                top: 10,
                left: 20
            },
            legend: {
                data: ['Dépenses', 'Objectif budget'],
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
                    let result = `${params[0].axisValue}<br/>`;
                    params.forEach(param => {
                        const value = Math.abs(param.value);
                        result += `${param.seriesName}: ${value.toFixed(2)}€<br/>`;
                    });
                    return result;
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: '#4ECDC4',
                borderWidth: 1,
                textStyle: {
                    color: '#FFF',
                    fontWeight: 'bold',
                }
            },
            grid: {
                top: 100,
                left: 50,
                right: 40,
                bottom: 50,
                containLabel: true
            },
            xAxis: { 
                type: 'category', 
                data: xAxisData,
                axisLine: { 
                    show: true,
                    lineStyle: { color: '#555' }
                },
                axisTick: { show: false },
                axisLabel: { 
                    color: '#CCCCCC',
                    fontSize: 11
                }
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
                    }
                },
                min: function(value) {
                    return Math.min(...seriesData) - 20;
                },
                max: 0
            },
            series: [
                {
                    name: 'Dépenses',
                    data: seriesData,
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 8,
                    lineStyle: {
                        color: '#4ECDC4',
                        width: 3,
                    },
                    itemStyle: {
                        color: '#4ECDC4',
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
                                offset: 0, color: 'rgba(78, 205, 196, 0.3)'
                            }, {
                                offset: 1, color: 'rgba(78, 205, 196, 0.05)'
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
                                    color: '#DDA853',
                                    type: 'dashed',
                                    width: 2
                                },
                                label: {
                                    formatter: function(params) {
                                        return 'Moy: ' + Math.abs(params.value).toFixed(0) + '€';
                                    },
                                    color: '#DDA853'
                                }
                            }
                        ]
                    }
                },
                {
                    name: 'Objectif budget',
                    data: seriesData.map(() => timeframe === 'day' ? -15 : timeframe === 'week' ? -60 : -150),
                    type: 'line',
                    lineStyle: {
                        color: '#FF9F43',
                        type: 'dashed',
                        width: 2
                    },
                    itemStyle: {
                        color: '#FF9F43'
                    },
                    symbol: 'none'
                }
            ],
        };

        chartInstance.setOption(option);

        chartInstance.on('click', (params: any) => {
            const dateStr = params.name;
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                onDateSelected(date);
            }
        });

        return () => chartInstance.dispose();
    }, [xAxisData, seriesData, onDateSelected]);

    return (
        <>
            {isLoading || isFetching ? (
                <ChartSkeleton header='' />
            ) : (
                <div className='w-full p-4 border rounded-lg bg-white/5 border-white/10 backdrop-blur-sm'>
                    <div className='flex justify-between items-center w-full mb-4'>
                        <div>
                            <p className='text-2xl font-bold text-white'>
                                {total.toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            </p>
                            <p className='text-sm text-gray-400'>Solde total</p>
                        </div>
                        <div className='flex space-x-2'>
                            <button 
                                onClick={() => onTimeframeChange('day')} 
                                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                                    timeframe === 'day' 
                                        ? 'bg-primary-500 text-white' 
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                Jour
                            </button>
                            <button 
                                onClick={() => onTimeframeChange('week')} 
                                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                                    timeframe === 'week' 
                                        ? 'bg-primary-500 text-white' 
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                Semaine
                            </button>
                            <button 
                                onClick={() => onTimeframeChange('month')} 
                                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                                    timeframe === 'month' 
                                        ? 'bg-primary-500 text-white' 
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                Mois
                            </button>
                        </div>
                    </div>
                    <div ref={chartRef} style={{ width: '100%', height: '350px' }} />
                </div>
            )}
        </>
    );
};

export default GraphiqueTimeframe;
