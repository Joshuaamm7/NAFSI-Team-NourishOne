// Feature: foundation-setup, Property 1: Defined routes render correct components
// **Validates: Requirements 1.3, 13.2**

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import fc from 'fast-check';
import '../utils/i18n';

import Gateway from '../components/christian/Gateway';
import FamilyPortal from '../pages/FamilyPortal';
import DonorPortal from '../pages/DonorPortal';
import VolunteerPortal from '../pages/VolunteerPortal';

// Route table mapping paths to the unique text each component renders
const ROUTE_TABLE = {
  '/': { component: <Gateway />, expectedText: 'NourishNet' },
  '/family': { component: <FamilyPortal />, expectedText: 'Family Portal' },
  '/donor': { component: <DonorPortal />, expectedText: 'Donor Portal' },
  '/volunteer': { component: <VolunteerPortal />, expectedText: 'Volunteer Portal' },
};

// Portal-specific texts (excluding Gateway since its text may appear in navbar)
const PORTAL_TEXTS = ['Family Portal', 'Donor Portal', 'Volunteer Portal'];

const ROUTE_PATHS = Object.keys(ROUTE_TABLE);

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

describe('Property 1: Defined routes render correct components', () => {
  it('for any defined route, the correct component text appears and no other portal text is present', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...ROUTE_PATHS),
        (path) => {
          const { unmount } = renderAtRoute(path);

          const { expectedText } = ROUTE_TABLE[path];

          // The expected text should be present
          expect(screen.getByText(expectedText, { exact: false })).toBeInTheDocument();

          // Other portal-specific texts should NOT be present
          const otherPortalTexts = PORTAL_TEXTS.filter((t) => t !== expectedText);
          for (const otherText of otherPortalTexts) {
            expect(screen.queryByText(otherText, { exact: true })).not.toBeInTheDocument();
          }

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
