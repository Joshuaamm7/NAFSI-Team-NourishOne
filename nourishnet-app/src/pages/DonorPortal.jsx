import React from 'react';
import { useTranslation } from 'react-i18next';

function DonorPortal() {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{t('portal.donor.title')}</h1>
      <p className="text-muted">{t('portal.donor.placeholder')}</p>
    </div>
  );
}

export default DonorPortal;
