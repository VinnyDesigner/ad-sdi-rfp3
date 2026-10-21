import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Screens
import { S00_Login } from './pages/S00_Login';
import { S01_Home } from './pages/S01_Home';
import { S02_Catalogue } from './pages/S02_Catalogue';
import { S03_DatasetDetail } from './pages/S03_DatasetDetail';
import { S04_Publishing } from './pages/S04_Publishing';
import { S05_QualityDashboard } from './pages/S05_QualityDashboard';
import { S06_ChangeDetection } from './pages/S06_ChangeDetection';
import { S07_GeoAIAssistant } from './pages/S07_GeoAIAssistant';
import { S08_Marketplace } from './pages/S08_Marketplace';
import { S09a_MarketplaceRequest } from './pages/S09a_MarketplaceRequest';
import { S09b_Entitlements } from './pages/S09b_Entitlements';
import { S09c_ProviderWorkspace } from './pages/S09c_ProviderWorkspace';
import { S10_DigitalTwin } from './pages/S10_DigitalTwin';
import { S11_CommandCentre } from './pages/S11_CommandCentre';
import { S12_GeoMaturity } from './pages/S12_GeoMaturity';
import { S13_OpenData } from './pages/S13_OpenData';
import { S14_SecurityConsole } from './pages/S14_SecurityConsole';
import { StandaloneMapViewer } from './pages/StandaloneMapViewer';
import { ServicesApis } from './pages/ServicesApis';
import { PoliciesStandards } from './pages/PoliciesStandards';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Layout Routes */}
            <Route path="/" element={<S01_Home />} />
            <Route path="/login" element={<S00_Login />} />
            <Route path="/catalogue" element={<S02_Catalogue />} />
            <Route path="/catalogue/land-parcels" element={<S03_DatasetDetail />} />
            <Route path="/open-data" element={<S13_OpenData />} />

            {/* Marketplace Module Routes */}
            <Route path="/marketplace" element={<S08_Marketplace />} />
            <Route path="/marketplace/request" element={<S09a_MarketplaceRequest />} />
            <Route path="/marketplace/entitlements" element={<S09b_Entitlements />} />
            <Route path="/marketplace/provider" element={<S09c_ProviderWorkspace />} />

            {/* Authenticated Workspace Routes */}
            <Route path="/workspace/map-viewer" element={<StandaloneMapViewer />} />
            <Route path="/workspace/publishing" element={<S04_Publishing />} />
            <Route path="/workspace/quality" element={<S05_QualityDashboard />} />
            <Route path="/workspace/geoai/change-detection" element={<S06_ChangeDetection />} />
            <Route path="/workspace/geoai/assistant" element={<S07_GeoAIAssistant />} />
            <Route path="/workspace/digital-twin" element={<S10_DigitalTwin />} />
            <Route path="/workspace/command-centre" element={<S11_CommandCentre />} />
            <Route path="/workspace/geomaturity" element={<S12_GeoMaturity />} />
            <Route path="/workspace/security" element={<S14_SecurityConsole />} />
            <Route path="/workspace/services" element={<ServicesApis />} />
            <Route path="/workspace/policies" element={<PoliciesStandards />} />

            {/* Fallback Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
