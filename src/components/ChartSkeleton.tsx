import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

export const ChartSkeleton = ({ className, header }: { className?: string; header: string }) => {
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

        // Génération de données aléatoires plus dynamiques
        const generateRandomData = () => {
            const data = [];
            let lastValue = 100 + Math.random() * 100; // Valeur de départ entre 100-200

            for (let i = 0; i < 7; i++) {
                // Variation entre -30 et +50 pour créer des courbes plus marquées
                const variation = (Math.random() - 0.3) * 80;
                lastValue = Math.max(20, lastValue + variation); // Minimum à 20
                data.push(Math.round(lastValue));
            }
            return data;
        };

        const updateChart = () => {
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
                    axisLabel: {
                        color: '#666',
                        opacity: 0.4, // Plus discret pour l'effet de chargement
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { show: false },
                    splitLine: {
                        lineStyle: {
                            color: '#e0e0e0',
                            opacity: 0.2,
                        },
                    },
                },
                series: [
                    {
                        name: 'Expenses',
                        data: generateRandomData(),
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            color: '#DDA853', // Couleur primary de votre design
                            width: 3,
                            opacity: 0.7,
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#dd53539f', // Dégradé primary
                                    },
                                    {
                                        offset: 1,
                                        color: '#DDA85330',
                                    },
                                ],
                            },
                            opacity: 0.5,
                        },
                        markPoint: {
                            data: [
                                {
                                    type: 'max',
                                    name: 'Max',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: { show: false },
                                    itemStyle: {
                                        color: '#DDA853',
                                        opacity: 0.8,
                                    },
                                },
                            ],
                        },
                        // Animation désactivée pour éviter les conflits
                        animation: false,
                    },
                ],
            };

            chartInstance.setOption(option, true);
        };

        // Mise à jour initiale
        updateChart();

        // Mise à jour périodique des données pour simuler le chargement
        const dataUpdateTimer = setInterval(() => {
            updateChart();
        }, 1200); // Nouvelles données toutes les 1.2 secondes

        return () => {
            if (dataUpdateTimer) {
                clearInterval(dataUpdateTimer);
            }
            chartInstance.dispose();
        };
    }, []);

    return (
        <div className={`w-full mb-4 rounded-lg ${className}`}>
            <div className='flex items-center gap-3 mb-2'>
                <h2 className='px-6 mb-0 text-xl font-bold text-gray-400'>{header}</h2>
                {/* Indicateur de chargement avec couleurs primary */}
                <div className='flex gap-1'>
                    <div className='w-2 h-2 rounded-full animate-pulse' style={{ backgroundColor: '#DDA853' }}></div>
                    <div
                        className='w-2 h-2 rounded-full animate-pulse'
                        style={{ backgroundColor: '#DDA853', animationDelay: '0.2s' }}
                    ></div>
                    <div
                        className='w-2 h-2 rounded-full animate-pulse'
                        style={{ backgroundColor: '#DDA853', animationDelay: '0.4s' }}
                    ></div>
                </div>
            </div>
            <div
                className='relative'
                style={{
                    filter: 'blur(1px)', // Flou plus marqué
                    animation: 'skeletonPulse 2s ease-in-out infinite, skeletonShake 3s ease-in-out infinite',
                }}
            >
                <div ref={chartRef} style={{ width: '100%', height: '300px' }} />

                {/* Overlay animé plus visible */}
                {/* <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
                        animation: 'shimmerLoader 2.5s linear infinite',
                    }}
                /> */}
                {/* Overlay shimmer avec couleur primary */}
                {/* <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(221, 168, 83, 0.15) 50%, transparent 100%)',
                        animation: 'shimmerLoader 2.5s linear infinite',
                    }}
                />
                 */}
                {/* Effet de pulsation coloré primary */}
                <div
                    className='absolute inset-0 pointer-events-none rounded-lg'
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(221, 168, 83, 0.08) 0%, transparent 70%)',
                        animation: 'colorPulse 3s ease-in-out infinite',
                    }}
                />
            </div>

            <style>{`
                @keyframes skeletonPulse {
                    0%, 100% { 
                        opacity: 0.7;
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.9;
                        transform: scale(1.002);
                    }
                }
                
                @keyframes skeletonShake {
                    0%, 100% { transform: translateX(0) translateY(0); }
                    25% { transform: translateX(-0.5px) translateY(0.5px); }
                    50% { transform: translateX(0.5px) translateY(-0.5px); }
                    75% { transform: translateX(-0.5px) translateY(-0.5px); }
                }
                
                @keyframes shimmerLoader {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes colorPulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                }
            `}</style>
        </div>
    );
};
