import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOLECULES } from '../constants';
import { ArrowLeft, Printer, Info } from 'lucide-react';

const Markers: React.FC = () => {
    const navigate = useNavigate();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* Header - Hidden when printing */}
            <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md print:hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Voltar ao Início</span>
                    </button>

                    <h1 className="text-xl font-bold">Imprimir Marcadores AR</h1>

                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-lg shadow-blue-600/20"
                    >
                        <Printer className="w-4 h-4" />
                        <span>Imprimir Tudo</span>
                    </button>
                </div>
            </header>

            {/* Instructions - Hidden when printing */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 print:hidden">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-blue-900">Como usar</h3>
                        <p className="text-sm text-blue-800">
                            Imprima esta página para obter os cartões. Recorte cada cartão e use a câmera do seu celular para escanear o QR Code.
                            Isso abrirá o modelo 3D correspondente em Realidade Aumentada.
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid of Cards */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-4">
                    {MOLECULES.map((molecule) => {
                        const arPageUrl = `${window.location.origin}/ar/${molecule.id}`;
                        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(arPageUrl)}&bgcolor=ffffff&color=000000&margin=10`;

                        return (
                            <div key={molecule.id} className="break-inside-avoid border-2 border-slate-200 rounded-xl p-6 flex flex-col items-center text-center bg-white shadow-sm print:shadow-none print:border-slate-400">
                                <h2 className="text-2xl font-bold mb-1">{molecule.name}</h2>
                                <p className="text-slate-500 font-mono mb-4 text-lg">{molecule.formula}</p>

                                <div className="border border-slate-100 rounded-lg p-2 mb-4 bg-white shadow-inner print:shadow-none print:border-none">
                                    <img
                                        src={qrImageUrl}
                                        alt={`QR Code para ${molecule.name}`}
                                        className="w-48 h-48 object-contain mix-blend-multiply"
                                    />
                                </div>

                                <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                                    {molecule.category}
                                </div>
                                <div className="mt-2 text-[10px] text-slate-400 print:text-slate-500">
                                    ID: {molecule.id}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Print Styles Injection */}
            <style>{`
                @media print {
                    @page {
                        margin: 1cm;
                    }
                    body {
                        background-color: white !important;
                        -webkit-print-color-adjust: exact;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Markers;
