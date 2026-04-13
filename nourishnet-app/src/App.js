import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/christian/Layout';
import Gateway from './components/christian/Gateway';
import LandingPage from './UI/LandingPage';
import WelcomePage from './UI/WelcomePage';
import PortalPage from './UI/PortalPage';
import FamilyPortal from './pages/FamilyPortal';
import DonorPortal from './pages/DonorPortal';
import VolunteerPortal from './pages/VolunteerPortal';
import './utils/i18n';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* New UI flow — no Layout wrapper */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/portal" element={<PortalPage />} />

        {/* Existing app with Layout */}
        <Route path="/" element={<Layout><Gateway /></Layout>} />
        <Route path="/family" element={<Layout><FamilyPortal /></Layout>} />
        <Route path="/donor" element={<Layout><DonorPortal /></Layout>} />
        <Route path="/volunteer" element={<Layout><VolunteerPortal /></Layout>} />
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
