import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/christian/Layout';
import Gateway from './components/christian/Gateway';
import LandingPage from './UI/LandingPage';
import FamilyPortal from './pages/FamilyPortal';
import DonorPortal from './pages/DonorPortal';
import VolunteerPortal from './pages/VolunteerPortal';
import './utils/i18n';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Landing page — no Layout wrapper (full-screen design) */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Main app with Layout */}
        <Route element={<Layout><Gateway /></Layout>} path="/" />
        <Route path="/family" element={<Layout><FamilyPortal /></Layout>} />
        <Route path="/donor" element={<Layout><DonorPortal /></Layout>} />
        <Route path="/volunteer" element={<Layout><VolunteerPortal /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
