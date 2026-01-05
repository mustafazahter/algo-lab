import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BasicsLayout from './pages/basics';
import DesignLayout from './pages/design';

import ComplexityLayout from './pages/complexity';
import CodeAnalysis from './pages/code-analysis';
import SearchLayout from './pages/search';
import SortingLayout from './pages/sorting';
import GraphAlgorithmsLayout from './pages/graphs';
import TreesLayout from './pages/trees';
import PnpLayout from './pages/pnp';

// Placeholder Pages (Şimdilik boş, sırayla doldurulacak)
const Placeholder = ({ title }) => (
  <div>
    <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>{title}</h2>
    <p style={{ color: 'var(--text-secondary)' }}>Bu modül geliştirme aşamasındadır.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="basics" element={<BasicsLayout />} />
          <Route path="design" element={<DesignLayout />} />
          <Route path="complexity" element={<ComplexityLayout />} />
          <Route path="code-analysis" element={<CodeAnalysis />} />
          <Route path="search" element={<SearchLayout />} />
          <Route path="sorting" element={<SortingLayout />} />
          <Route path="graphs" element={<GraphAlgorithmsLayout />} /> {/* Changed 'graph' to 'graphs' and used GraphAlgorithmsLayout */}
          <Route path="trees" element={<TreesLayout />} />
          <Route path="pnp" element={<PnpLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
