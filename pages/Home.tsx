import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Molecule, MoleculeCategory } from '../types';
import { MOLECULES } from '../constants';
import MoleculeCard from '../components/MoleculeCard';
import QRCodeDisplay from '../components/QRCodeDisplay';
import { Search, Beaker, Grid3X3 } from 'lucide-react';
import { cn } from '../lib/utils';

const Home: React.FC = () => {
    const [selectedMolecule, setSelectedMolecule] = useState<Molecule>(MOLECULES[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<MoleculeCategory | 'All'>('All');
    const navigate = useNavigate();

    const filteredMolecules = useMemo(() => {
        return MOLECULES.filter(mol => {
            const matchesSearch = mol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                mol.formula.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || mol.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <motion.div 
            className="min-h-screen bg-[#0f172a] text-slate-200 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Navbar */}
            <motion.nav 
                className="sticky top-0 z-50 glass-panel border-b border-slate-700/50 no-print"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <motion.div 
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Beaker className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white font-grotesk">
                            Molecul<span className="text-blue-400">AR</span> Gen
                        </span>
                    </motion.div>
                    <div className="hidden md:flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Feito com Gemini API
                        </span>
                        <div className="h-4 w-px bg-slate-700"></div>
                        <span>React + Tailwind</span>
                    </div>
                </div>
            </motion.nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar / Selection List */}
                    <motion.aside 
                        className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-6 no-print h-[calc(100vh-140px)] lg:sticky lg:top-24"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Filters */}
                        <div className="space-y-4">
                            <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar molécula..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                />
                            </motion.div>

                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory('All')}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
                                        selectedCategory === 'All'
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                            : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                                    )}
                                >
                                    Todas
                                </motion.button>
                                {Object.values(MoleculeCategory).map((cat) => (
                                    <motion.button
                                        key={cat}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
                                            selectedCategory === cat
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                                : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                                        )}
                                    >
                                        {cat}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Molecule Grid */}
                        <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin">
                            {filteredMolecules.length === 0 ? (
                                <motion.div 
                                    className="text-center py-10 text-slate-500"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <Grid3X3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>Nenhuma molécula encontrada.</p>
                                </motion.div>
                            ) : (
                                <motion.div layout className="space-y-3">
                                    {filteredMolecules.map((mol) => (
                                        <MoleculeCard
                                            key={mol.id}
                                            molecule={mol}
                                            isSelected={selectedMolecule.id === mol.id}
                                            onClick={() => setSelectedMolecule(mol)}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <motion.div 
                            className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 text-xs text-blue-200 flex flex-col gap-3"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex gap-3 items-start">
                                <Grid3X3 className="w-5 h-5 shrink-0" />
                                <p>Selecione uma molécula para ver detalhes.</p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/markers')}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 mt-1 shadow-lg shadow-blue-600/20"
                            >
                                <Grid3X3 className="w-4 h-4" />
                                Imprimir Marcadores
                            </motion.button>
                        </motion.div>
                    </motion.aside>

                    {/* Main Content Area */}
                    <motion.section 
                        className="w-full lg:w-2/3 xl:w-3/4"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <QRCodeDisplay molecule={selectedMolecule} />
                    </motion.section>
                </div>
            </main>
        </motion.div>
    );
};

export default Home;
