import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOLECULES } from '../constants';
import MoleculeViewer3D from '../components/MoleculeViewer3D';
import { ArrowLeft, Smartphone, Info } from 'lucide-react';

const MoleculeAR: React.FC = () => {
    const { moleculeId } = useParams<{ moleculeId: string }>();
    const navigate = useNavigate();

    const molecule = MOLECULES.find(m => m.id === moleculeId);

    if (!molecule) {
        return (
            <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Molécula não encontrada</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg transition-colors"
                    >
                        Voltar ao início
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Voltar</span>
                    </button>

                    <div className="text-center flex-1">
                        <h1 className="text-xl font-bold">{molecule.name}</h1>
                        <p className="text-sm text-blue-300 font-mono">{molecule.formula}</p>
                    </div>

                    <div className="w-20"></div> {/* Spacer for centering */}
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* 3D Viewer - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6 min-h-[600px]">
                            <MoleculeViewer3D
                                modelPath={molecule.modelPath}
                                moleculeName={molecule.name}
                                formula={molecule.formula}
                                modelVariants={molecule.modelVariants}
                            />
                        </div>

                        {/* AR Instructions */}
                        <div className="mt-4 bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
                            <Smartphone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-100">
                                <p className="font-semibold mb-1">Como ver em Realidade Aumentada:</p>
                                <ol className="list-decimal list-inside space-y-1 text-blue-200/80">
                                    <li>Toque no ícone AR no visualizador 3D acima</li>
                                    <li>Permita o acesso à câmera do seu dispositivo</li>
                                    <li>Aponte para uma superfície plana</li>
                                    <li>Toque para posicionar a molécula no espaço real</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Info Panel */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
                            <div className="flex items-center gap-2 mb-4 text-slate-300">
                                <Info className="w-5 h-5" />
                                <h2 className="font-semibold text-lg">Informações</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-400 mb-1">Nome</h3>
                                    <p className="text-white">{molecule.name}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-400 mb-1">Fórmula</h3>
                                    <p className="text-white font-mono text-lg">{molecule.formula}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-400 mb-1">Categoria</h3>
                                    <span className="inline-block bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                                        {molecule.category}
                                    </span>
                                </div>

                                {molecule.description && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-400 mb-1">Descrição</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed">{molecule.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Controls Info */}
                        <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
                            <h3 className="font-semibold mb-3">Controles</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400">•</span>
                                    <span><strong>Arrastar:</strong> Rotacionar molécula</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400">•</span>
                                    <span><strong>Pinça/Scroll:</strong> Zoom in/out</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400">•</span>
                                    <span><strong>Dois dedos:</strong> Mover posição</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MoleculeAR;
