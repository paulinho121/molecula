import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoleculeAR from './pages/MoleculeAR';
import Markers from './pages/Markers';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ar/:moleculeId" element={<MoleculeAR />} />
        <Route path="/markers" element={<Markers />} />
      </Routes>
    </Router>
  );
};

export default App;