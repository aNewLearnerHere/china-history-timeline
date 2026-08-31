import { HashRouter, Routes, Route } from 'react-router-dom';
import Timeline from './components/Timeline/Timeline';
import DynastyPage from './pages/DynastyPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/dynasty/:id" element={<DynastyPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
