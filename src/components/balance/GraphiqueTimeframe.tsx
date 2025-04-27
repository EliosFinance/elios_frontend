import { instance_back } from '@/api/const';
import { userStore } from '@/store/UserStore';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

export interface GraphiqueTimeframeProps {
    timeframe: 'day' | 'week' | 'month';
    onTimeframeChange: (newTimeframe: 'day' | 'week' | 'month') => void;
    onDateSelected: (date: Date) => void;
    total: number;
}

const GraphiqueTimeframe: React.FC<GraphiqueTimeframeProps> = ({
    timeframe,
    onTimeframeChange,
    onDateSelected,
    total,
}) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [xAxisData, setXAxisData] = useState<string[]>([]);
    const [seriesData, setSeriesData] = useState<number[]>([]);

    useEffect(() => {
        async function fetchChartData() {
            try {
                const headers = userStore.getState().getAuth();
                const response = await instance_back.get(`powens/transactions/statistics?timeframe=${timeframe}`, {
                    headers,
                });
                setXAxisData(response.data.xAxis);
                setSeriesData(response.data.series);
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
    }, [timeframe]);

    useEffect(() => {
        if (!chartRef.current) return;
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
        <div>
            <div className='flex justify-end space-x-4'>
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
            <p className='text-2xl -mb-8 font-bold'>
                {total.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                })}
            </p>
            <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
        </div>
    );
};

export default GraphiqueTimeframe;
