import { ArrowLeft, Clock, Code, Eye, Rocket, Sparkles } from 'lucide-react';
import React from 'react';

const ComingSoonPage = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className='min-h-screen'>
            {/* Main content */}
            <div className='flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 pt-2'>
                <div className='text-center max-w-md mx-auto'>
                    {/* Icon animation */}
                    <div className='flex items-center justify-between'>
                        <div className='relative mb-8'>
                            <div className='w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-2xl animate-pulse'>
                                <Rocket className='w-8 h-8 text-white' />
                            </div>
                            <div className='absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce'>
                                <Sparkles className='w-4 h-4 text-yellow-800' />
                            </div>
                        </div>
                        <div className='flex flex-col h-full items-start justify-start mb-2'>
                            {/* Main message */}
                            <h1 className='text-4xl font-bold text-white bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent'>
                                Pssst, patience !
                            </h1>

                            <h2 className='text-xl font-semibold text-gray-300 mb-6'>Ça arrive ! 🚀</h2>
                        </div>
                    </div>

                    <p className='text-justify text-gray-400 mb-8 leading-relaxed'>
                        Notre équipe de développement travaille dur pour vous apporter cette fonctionnalité. Elle sera
                        bientôt disponible avec plein de nouvelles surprises !
                    </p>

                    {/* Features coming soon */}
                    <div className='grid grid-cols-1 gap-3 mb-8'>
                        <div className='flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm'>
                            <div className='w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center'>
                                <Code className='w-4 h-4 text-blue-400' />
                            </div>
                            <span className='text-sm text-gray-300'>Interface intuitive</span>
                        </div>

                        <div className='flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm'>
                            <div className='w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center'>
                                <Sparkles className='w-4 h-4 text-green-400' />
                            </div>
                            <span className='text-sm text-gray-300'>Expérience optimisée</span>
                        </div>

                        <div className='flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm'>
                            <div className='w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center'>
                                <Eye className='w-4 h-4 text-purple-400' />
                            </div>
                            <span className='text-sm text-gray-300'>Design moderne</span>
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <div className='mb-8'>
                        <div className='flex items-center gap-2 mb-2'>
                            <Clock className='w-4 h-4 text-primary-400' />
                            <span className='text-sm font-medium text-gray-300'>Progression du développement</span>
                        </div>
                        <div className='w-full bg-gray-700 rounded-full h-2'>
                            <div
                                className='bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full animate-pulse'
                                style={{ width: '75%' }}
                            ></div>
                        </div>
                        <div className='text-xs text-gray-400 mt-1'>75% complété</div>
                    </div>

                    {/* Action buttons */}
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <button
                            onClick={handleGoBack}
                            className='flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
                        >
                            <ArrowLeft className='w-4 h-4' />
                            Retour à l'accueil
                        </button>

                        <button
                            onClick={() =>
                                alert(
                                    'Notifications activées ! Vous serez prévenu dès que la fonctionnalité sera disponible.',
                                )
                            }
                            className='flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-200'
                        >
                            Me notifier
                        </button>
                    </div>
                </div>

                {/* Footer message */}
                <div className='mt-12 text-center'>
                    <p className='text-xs text-gray-500'>
                        En attendant, n'hésitez pas à explorer les autres fonctionnalités disponibles !
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComingSoonPage;
