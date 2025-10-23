import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { QuoteProvider } from './contexts/QuoteContext';

import { Toaster } from './components/ui/toaster';
import Navbar from './components/layout/Navbar';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import PremiumPage from './pages/PremiumPage';
import AdminPage from './pages/AdminPage';
import CreateQuotePage from './pages/CreateQuotePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import ContactPage from './pages/ContactPage';
import SettingsPage from './pages/SettingsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import TechStackPage from './pages/TechStackPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ResetPassword from './pages/ResetPassword';  // ✅ FIXED (relative import)

// import UploadPoster from './pages/UploadPoster';
// import UploadsPage from './pages/UploadsPage';   

import ProtectedRoute from './components/auth/ProtectedRoute';

const AppContent = () => {
  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Apna Poster - Create & Share Posters</title>
        <meta
          name="description"
          content="Discover, create, and share beautiful posters. Get inspired daily!"
        />
      </Helmet>

      <Navbar />

      <main className="pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/tech-stack" element={<TechStackPage />} />
          {/* <Route path="/upload" element={<UploadPoster />} />
          <Route path="/uploads" element={<UploadsPage />} /> */}
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Admin Route */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/premium"
            element={
              <ProtectedRoute>
                <PremiumPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateQuotePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Toaster />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <QuoteProvider>
            <AppContent />
          </QuoteProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
