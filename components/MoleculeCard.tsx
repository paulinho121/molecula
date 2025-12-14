import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Molecule, MoleculeCategory } from '../types';
import { Atom, FlaskConical, Dna, Pill } from 'lucide-react';

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
    onClick(); // Still call the original onClick for selection
    navigate(`/ar/${molecule.id}`); // Navigate to AR page
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left p-4 rounded-xl transition-all duration-300 border group relative overflow-hidden ${isSelected
          ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
          : 'bg-slate-800/40 border-slate-700 hover:border-slate-500 hover:bg-slate-800/60'
        }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-900/50 border border-slate-700 text-xs font-medium text-slate-300">
          <CategoryIcon category={molecule.category} />
          {molecule.category}
        </div>
        <span className="text-xs font-mono text-slate-400 opacity-60">{molecule.formula}</span>
      </div>

      <h3 className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
        {molecule.name}
      </h3>

      <p className="text-sm text-slate-400 line-clamp-2">
        {molecule.description}
      </p>

      {/* Decorative glow for selected state */}
      {isSelected && (
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full pointer-events-none" />
      )}
    </button>
  );
};

export default MoleculeCard;