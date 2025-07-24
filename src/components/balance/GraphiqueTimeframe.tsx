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
