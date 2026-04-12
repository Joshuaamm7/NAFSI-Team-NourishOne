import React from 'react';
import { useTranslation } from 'react-i18next';

function VolunteerPortal() {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{t('portal.volunteer.title')}</h1>
      <p className="text-muted">{t('portal.volunteer.placeholder')}</p>
    </div>
  );
}

export default VolunteerPortal;
