import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/christian/Layout';
import Gateway from './components/christian/Gateway';
import FamilyPortal from './pages/FamilyPortal';
import DonorPortal from './pages/DonorPortal';
import VolunteerPortal from './pages/VolunteerPortal';
import './utils/i18n';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Gateway />} />
          <Route path="/family" element={<FamilyPortal />} />
          <Route path="/donor" element={<DonorPortal />} />
          <Route path="/volunteer" element={<VolunteerPortal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
