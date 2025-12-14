import React, { useEffect, useState } from 'react';
import { Molecule, GeminiExplanation } from '../types';
import { fetchMoleculeDetails } from '../services/geminiService';
import MoleculeViewer3D from './MoleculeViewer3D';
import { Download, Printer, Smartphone, Sparkles, Loader2, ExternalLink } from 'lucide-react';

interface QRCodeDisplayProps {
  molecule: Molecule;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ molecule }) => {
  const [details, setDetails] = useState<GeminiExplanation | null>(null);
  const [loading, setLoading] = useState(false);

  // Generate URL for the AR page
  const arPageUrl = `${window.location.origin}/ar/${molecule.id}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(arPageUrl)}&bgcolor=ffffff&color=000000&margin=10`;

  useEffect(() => {
    let isMounted = true;
    const loadDetails = async () => {
      setLoading(true);
      setDetails(null);
      try {
        // Add a small delay to not spam API if user clicks rapidly
        await new Promise(r => setTimeout(r, 500));
        if (!isMounted) return;

        const info = await fetchMoleculeDetails(molecule.name);
        if (isMounted) setDetails(info);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDetails();
    return () => { isMounted = false; };
  }, [molecule]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-fadeIn">
      {/* Printable Area Header (Only visible on print) */}
      <div className="hidden print:block text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-4xl font-bold text-black mb-2">MoleculAR</h1>
        <p className="text-xl text-gray-600">Escaneie para ver em 3D com o Google</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* QR Code Card */}
        <div id="printable-area" className="w-full lg:w-1/2 glass-panel rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-blue-500/30 shadow-2xl bg-white/5 print:shadow-none print:border-4 print:border-black print:bg-white print:text-black">

          <div className="bg-white p-4 rounded-xl shadow-inner mb-6 print:p-0 print:shadow-none">
            <img
              src={qrImageUrl}
              alt={`QR Code for ${molecule.name}`}
              className="w-64 h-64 object-contain mix-blend-multiply"
            />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 print:text-black">{molecule.name}</h2>
          <p className="text-blue-300 font-mono text-lg mb-6 print:text-gray-700">{molecule.formula}</p>

          <div className="flex items-center gap-3 text-slate-400 text-sm bg-slate-900/50 px-4 py-2 rounded-full border border-slate-700 print:hidden">
            <Smartphone className="w-4 h-4" />
            <span>Abra a câmera do celular e escaneie</span>
          </div>

          <div className="hidden print:block text-center mt-4">
            <p className="text-sm text-gray-500">Abra o Google App ou Câmera para ver em AR.</p>
          </div>
        </div>

        {/* Info & Actions */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 no-print">

          {/* Gemini Info Card */}
          <div className="glass-panel p-6 rounded-2xl flex-grow min-h-[300px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold uppercase tracking-wider text-xs">Gemini AI Analysis</span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-sm animate-pulse">Gerando dados moleculares...</p>
              </div>
            ) : details ? (
              <div className="space-y-5 animate-slideIn">
                <div>
                  <h4 className="text-slate-300 text-sm font-semibold mb-1">Curiosidade</h4>
                  <p className="text-slate-100 leading-relaxed">{details.funFact}</p>
                </div>
                <div>
                  <h4 className="text-slate-300 text-sm font-semibold mb-1">Estrutura</h4>
                  <p className="text-slate-400 text-sm">{details.structure}</p>
                </div>
                <div>
                  <h4 className="text-slate-300 text-sm font-semibold mb-1">Aplicação</h4>
                  <p className="text-slate-400 text-sm">{details.usage}</p>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-center mt-10">Erro ao carregar dados.</div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-xl transition-colors font-medium"
            >
              <Printer className="w-4 h-4" />
              Imprimir Cartão
            </button>
            <a
              href={qrImageUrl}
              download={`${molecule.name}-qrcode.png`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-xl transition-colors font-medium shadow-lg shadow-blue-600/20"
            >
              <Download className="w-4 h-4" />
              Baixar PNG
            </a>
          </div>

          <a
            href={arPageUrl}
            target="_blank"
            rel="noreferrer"
            className="text-center text-xs text-slate-500 hover:text-blue-400 flex items-center justify-center gap-1 transition-colors"
          >
            Testar link diretamente <ExternalLink className="w-3 h-3" />
          </a>

        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;