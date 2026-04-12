// Feature: foundation-setup, Property 2: Undefined routes redirect to Gateway
// **Validates: Requirements 1.4**

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import fc from 'fast-check';
import '../utils/i18n';

import Gateway from '../components/christian/Gateway';
import FamilyPortal from '../pages/FamilyPortal';
import DonorPortal from '../pages/DonorPortal';
import VolunteerPortal from '../pages/VolunteerPortal';

const DEFINED_ROUTES = ['', 'family', 'donor', 'volunteer'];

const PORTAL_TEXTS = ['Family Portal', 'Donor Portal', 'Volunteer Portal'];

/**
 * Helper: renders the app routes inside a MemoryRouter at the given path.
 */
function renderAtRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Gateway />} />
        <Route path="/family" element={<FamilyPortal />} />
        <Route path="/donor" element={<DonorPortal />} />
        <Route path="/volunteer" element={<VolunteerPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Property 2: Undefined routes redirect to Gateway', () => {
  it('for any undefined route, the Gateway renders and no portal-specific text appears', () => {
    fc.assert(
      fc.property(
        fc
          .stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'), {
            minLength: 1,
            maxLength: 20,
          })
          .filter((s) => !DEFINED_ROUTES.includes(s)),
        (segment) => {
          const path = `/${segment}`;
          const { unmount } = renderAtRoute(path);

          // Gateway should render — look for "NourishNet" text
          expect(screen.getByText('NourishNet')).toBeInTheDocument();

          // No portal-specific text should appear
          for (const portalText of PORTAL_TEXTS) {
            expect(screen.queryByText(portalText, { exact: true })).not.toBeInTheDocument();
          }

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
