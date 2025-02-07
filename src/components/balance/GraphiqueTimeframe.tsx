import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export interface GraphiqueTimeframeProps {
  timeframe: 'day' | 'week' | 'month';
  onTimeframeChange: (newTimeframe: 'day' | 'week' | 'month') => void;
  onDateSelected: (date: Date) => void; // Lorsque l'utilisateur sélectionne un jour
}

const GraphiqueTimeframe: React.FC<GraphiqueTimeframeProps> = ({
  timeframe,
  onTimeframeChange,
  onDateSelected,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chartInstance = echarts.init(chartRef.current);

    // Exemple de données selon le timeframe
    const data = timeframe === 'day'
      ? ['08:00', '12:00', '16:00', '20:00']
      : timeframe === 'week'
      ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
      : ['S1', 'S2', 'S3', 'S4'];

    const option = {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data },
      yAxis: { type: 'value' },
      series: [
        {
          data: data.map(() => Math.floor(Math.random() * 1000)),
          type: 'line',
          smooth: true,
        },
      ],
    };

    chartInstance.setOption(option);

    // Exemple simple : lorsque l'utilisateur clique sur une barre ou un point, on renvoie une date fictive
    chartInstance.on('click', (params: any) => {
      // Ici vous pouvez calculer la date sélectionnée en fonction de params
      onDateSelected(new Date());
    });

    return () => chartInstance.dispose();
  }, [timeframe, onDateSelected]);

  return (
    <div>
      <div className="flex justify-end space-x-4 mb-2">
        <button onClick={() => onTimeframeChange('day')} className="px-2 py-1 border rounded">
          Jour
        </button>
        <button onClick={() => onTimeframeChange('week')} className="px-2 py-1 border rounded">
          Semaine
        </button>
        <button onClick={() => onTimeframeChange('month')} className="px-2 py-1 border rounded">
          Mois
        </button>
      </div>
      <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
    </div>
  );
};

export default GraphiqueTimeframe;