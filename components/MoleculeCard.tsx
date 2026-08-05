import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Molecule, MoleculeCategory } from '../types';
import { Atom, FlaskConical, Dna, Pill, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface MoleculeCardProps {
  molecule: Molecule;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryIcon = ({ category }: { category: MoleculeCategory }) => {
  switch (category) {
    case MoleculeCategory.ORGANIC:
      return <Atom className="w-4 h-4 text-green-400" />;
    case MoleculeCategory.INORGANIC:
      return <FlaskConical className="w-4 h-4 text-blue-400" />;
    case MoleculeCategory.BIOLOGICAL:
      return <Dna className="w-4 h-4 text-pink-400" />;
    case MoleculeCategory.DRUG:
      return <Pill className="w-4 h-4 text-purple-400" />;
    default:
      return <Atom className="w-4 h-4 text-gray-400" />;
  }
};

const MoleculeCard: React.FC<MoleculeCardProps> = ({ molecule, isSelected, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    navigate(`/ar/${molecule.id}`);
  };

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={cn(
        "w-full text-left p-4 rounded-xl transition-all duration-300 border group relative overflow-hidden",
        isSelected
          ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
          : 'bg-slate-800/40 border-slate-700 hover:border-slate-500 hover:bg-slate-800/60 hover:shadow-lg'
      )}
    >
      {/* Glow effect for selected state */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full pointer-events-none"
        />
      )}

      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-900/50 border border-slate-700 text-xs font-medium text-slate-300">
          <CategoryIcon category={molecule.category} />
          {molecule.category}
        </div>
        <span className="text-xs font-mono text-slate-400 opacity-60">{molecule.formula}</span>
      </div>

      <h3 className={cn(
        "text-lg font-bold mb-1 relative z-10",
        isSelected ? 'text-white' : 'text-slate-200'
      )}>
        {molecule.name}
      </h3>

      <p className="text-sm text-slate-400 line-clamp-2 relative z-10 mb-2">
        {molecule.description}
      </p>

      <div className="flex items-center gap-1 text-blue-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Ver em AR</span>
        <ChevronRight className="w-3 h-3" />
      </div>
    </motion.button>
  );
};

export default MoleculeCard;
