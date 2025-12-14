import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Molecule, MoleculeCategory } from '../types';
import { MOLECULES } from '../constants';
import MoleculeCard from '../components/MoleculeCard';
import QRCodeDisplay from '../components/QRCodeDisplay';
import { Search, Beaker, Grid3X3 } from 'lucide-react';

const Home: React.FC = () => {
    const [selectedMolecule, setSelectedMolecule] = useState<Molecule>(MOLECULES[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<MoleculeCategory | 'All'>('All');
    const navigate = useNavigate();

    // Filter logic
    const filteredMolecules = useMemo(() => {
        return MOLECULES.filter(mol => {
            const matchesSearch = mol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                mol.formula.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || mol.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">

            {/* Navbar */}
            <nav className="sticky top-0 z-50 glass-panel border-b border-slate-700/50 no-print">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Beaker className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white font-grotesk">
                            Molecul<span className="text-blue-400">AR</span> Gen
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-sm text-slate-400">
                        <span>Feito com Gemini API</span>
                        <div className="h-4 w-px bg-slate-700"></div>
                        <span>React + Tailwind</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar / Selection List */}
                    <aside className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-6 no-print h-[calc(100vh-140px)] lg:sticky lg:top-24">

                        {/* Filters */}
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar molécula..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === 'All'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                                        }`}
                                >
                                    Todas
                                </button>
                                {Object.values(MoleculeCategory).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Molecule Grid */}
                        <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin">
                            {filteredMolecules.length === 0 ? (
                                <div className="text-center py-10 text-slate-500">
                                    <Grid3X3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>Nenhuma molécula encontrada.</p>
                                </div>
                            ) : (
                                filteredMolecules.map((mol) => (
                                    <MoleculeCard
                                        key={mol.id}
                                        molecule={mol}
                                        isSelected={selectedMolecule.id === mol.id}
                                        onClick={() => setSelectedMolecule(mol)}
                                    />
                                ))
                            )}
                        </div>

                        <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 text-xs text-blue-200 flex flex-col gap-3">
                            <div className="flex gap-3 items-start">
                                <Grid3X3 className="w-5 h-5 shrink-0" />
                                <p>Selecione uma molécula para ver detalhes.</p>
                            </div>

                            <button
                                onClick={() => navigate('/markers')}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 mt-1"
                            >
                                <Grid3X3 className="w-4 h-4" />
                                Imprimir Marcadores
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <section className="w-full lg:w-2/3 xl:w-3/4">
                        <QRCodeDisplay molecule={selectedMolecule} />
                    </section>
                </div>

            </main>
        </div>
    );
};

export default Home;
