import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import '../utils/i18n';
import LanguageToggle from '../components/christian/LanguageToggle';
import { getPreferences } from '../utils/preferences';

import i18n from '../utils/i18n';

beforeEach(async () => {
  localStorage.clear();
  await i18n.changeLanguage('en');
});

describe('LanguageToggle', () => {
  it('renders the language dropdown trigger with current language', () => {
    render(<LanguageToggle />);
    expect(screen.getByLabelText('Change language')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('opens dropdown and shows all languages on click', async () => {
    render(<LanguageToggle />);
    const trigger = screen.getByLabelText('Change language');

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox', { name: /language options/i })).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('中文')).toBeInTheDocument();
  });

  it('switches language and persists preference on selection', async () => {
    render(<LanguageToggle />);

    // Open dropdown
    await userEvent.click(screen.getByLabelText('Change language'));

    // Select Spanish
    const esOption = screen.getByText('Español');
    await userEvent.click(esOption);

    // Preference should be saved
    const prefs = getPreferences();
    expect(prefs.language).toBe('es');
  });

  it('highlights the active language with aria-selected', async () => {
    render(<LanguageToggle />);

    // Open dropdown
    await userEvent.click(screen.getByLabelText('Change language'));

    const listbox = screen.getByRole('listbox');
    const options = within(listbox).getAllByRole('option');

    // English should be selected by default
    const enOption = options.find((opt) => opt.getAttribute('aria-selected') === 'true');
    expect(enOption).toBeTruthy();
    expect(enOption).toHaveTextContent('English');
  });

  it('has accessible aria-label on trigger', () => {
    render(<LanguageToggle />);
    expect(screen.getByLabelText('Change language')).toBeInTheDocument();
  });
});
