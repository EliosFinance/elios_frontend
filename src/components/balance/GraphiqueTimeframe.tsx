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
    const { data: transactions, isLoading, isFetching } = useGetTransactions(connections);
    useEffect(() => {
        async function fetchChartData() {
            if (isLoading || isFetching) return;
            try {
                const t = transactions
                    ?.map((tx) => {
                        const dateValue = (tx as any).date || tx.last_update;
                        const parsedDate = new Date(String(dateValue));
                        return {
                            date: parsedDate,
                            value: Number(tx.value) || 0,
                        };
                    })
                    .filter((tx) => !isNaN(tx.date.getTime()));
                if (!t || t.length === 0) {
                    throw new Error('No valid transactions found');
                }
                const groupedData: Record<string, number> = {};
                if (timeframe === 'day') {
                    t.forEach((tx) => {
                        const dateStr = tx.date.toISOString().split('T')[0];
                        groupedData[dateStr] = (groupedData[dateStr] || 0) + tx.value;
                    });
                    setXAxisData(Object.keys(groupedData));
                    setSeriesData(Object.values(groupedData));
                } else if (timeframe === 'week') {
                    t.forEach((tx) => {
                        const date = new Date(tx.date);
                        const day = date.toLocaleDateString('fr-FR', { weekday: 'short' });
                        groupedData[day] = (groupedData[day] || 0) + tx.value;
                    });
                    setXAxisData(Object.keys(groupedData));
                    setSeriesData(Object.values(groupedData));
                } else if (timeframe === 'month') {
                    t.forEach((tx) => {
                        const month = tx.date.toISOString().slice(0, 7); // YYYY-MM
                        groupedData[month] = (groupedData[month] || 0) + tx.value;
                    });
                    setXAxisData(Object.keys(groupedData));
                    setSeriesData(Object.values(groupedData));
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données du graphique:', error);
                if (timeframe === 'day') {
                    setXAxisData([
                        '2025-02-07T08:00:00Z',
                        '2025-02-07T12:00:00Z',
                        '2025-02-07T16:00:00Z',
                        '2025-02-07T20:00:00Z',
                    ]);
                    setSeriesData([150, 300, 200, 400]);
                } else if (timeframe === 'week') {
                    setXAxisData(['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']);
                    setSeriesData([120, 200, 150, 80, 70, 110, 130]);
                } else if (timeframe === 'month') {
                    setXAxisData(['2025-02-01', '2025-02-08', '2025-02-15', '2025-02-22', '2025-02-28']);
                    setSeriesData([500, 750, 600, 900, 800]);
                }
            }
        }
        fetchChartData();
    }, [timeframe, transactions, connections]);

    useEffect(() => {
        if (!chartRef.current || isFetching || isLoading) return;
        const chartInstance = echarts.init(chartRef.current);
        const option = {
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: xAxisData },
            yAxis: { type: 'value' },
            series: [
                {
                    data: seriesData,
                    type: 'line',
                    smooth: true,
                },
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
                    <div className='flex justify-end w-full space-x-4'>
                        <button onClick={() => onTimeframeChange('day')} className='px-2 py-1 border rounded'>
                            Jour
                        </button>
                        <button onClick={() => onTimeframeChange('week')} className='px-2 py-1 border rounded'>
                            Semaine
                        </button>
                        <button onClick={() => onTimeframeChange('month')} className='px-2 py-1 border rounded'>
                            Mois
                        </button>
                    </div>
                    <p className='-mb-8 text-2xl font-bold'>
                        {total.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR',
                        })}
                    </p>
                    <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
                </div>
            )}
        </>
    );
};

export default GraphiqueTimeframe;
