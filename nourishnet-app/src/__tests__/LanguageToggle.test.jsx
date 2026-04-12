import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import '../utils/i18n'; // initialize i18n
import LanguageToggle from '../components/christian/LanguageToggle';
import { getPreferences } from '../utils/preferences';

beforeEach(() => {
  localStorage.clear();
});

describe('LanguageToggle', () => {
  it('renders EN and ES buttons', () => {
    render(<LanguageToggle />);
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });

  it('highlights the active language button', () => {
    render(<LanguageToggle />);
    const enBtn = screen.getByText('EN');
    // EN should be active by default
    expect(enBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('switches language and persists preference on click', async () => {
    render(<LanguageToggle />);
    const esBtn = screen.getByText('ES');

    await userEvent.click(esBtn);

    // Preference should be saved
    const prefs = getPreferences();
    expect(prefs.language).toBe('es');

    // ES button should now be active
    expect(esBtn).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('EN')).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches back to English', async () => {
    render(<LanguageToggle />);

    await userEvent.click(screen.getByText('ES'));
    await userEvent.click(screen.getByText('EN'));

    const prefs = getPreferences();
    expect(prefs.language).toBe('en');
    expect(screen.getByText('EN')).toHaveAttribute('aria-pressed', 'true');
  });

  it('has accessible role group with label', () => {
    render(<LanguageToggle />);
    expect(screen.getByRole('group', { name: /language selector/i })).toBeInTheDocument();
  });
});
