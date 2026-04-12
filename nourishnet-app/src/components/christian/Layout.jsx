import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

function Layout({ children }) {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-soft">
        <Link to="/" className="text-xl font-bold text-primary-700">
          NourishNet
        </Link>
        <div className="flex items-center gap-4">
          {!isHome && (
            <Link to="/" className="text-sm text-primary-600 hover:underline">
              {t('common.backToHome')}
            </Link>
          )}
          <LanguageToggle />
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
