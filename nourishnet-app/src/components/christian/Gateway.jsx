import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Gateway() {
  const { t } = useTranslation();

  const portals = [
    { to: '/family', icon: '🍎', titleKey: 'gateway.familyPortal', descKey: 'gateway.familyPortalDesc' },
    { to: '/donor', icon: '🤝', titleKey: 'gateway.donorPortal', descKey: 'gateway.donorPortalDesc' },
    { to: '/volunteer', icon: '💪', titleKey: 'gateway.volunteerPortal', descKey: 'gateway.volunteerPortalDesc' },
  ];

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold text-primary-700 mb-2">{t('gateway.title')}</h1>
      <p className="text-muted mb-8 text-center">{t('gateway.subtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {portals.map(({ to, icon, titleKey, descKey }) => (
          <Link
            key={to}
            to={to}
            className="block bg-surface rounded-2xl shadow-soft p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">{icon}</div>
            <h2 className="text-xl font-semibold mb-1">{t(titleKey)}</h2>
            <p className="text-muted text-sm">{t(descKey)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Gateway;
