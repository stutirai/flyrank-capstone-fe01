import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsForm from '../components/SettingsForm';
import { BIO_MAX_LENGTH } from '../types/settings';

describe('SettingsForm', () => {
  it('renders all required sections', () => {
    render(<SettingsForm />);

    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Notifications' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Appearance' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Privacy' })).toBeInTheDocument();
  });

  it('renders profile fields with accessible labels', () => {
    render(<SettingsForm />);

    expect(screen.getByLabelText('Display name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/)).toBeInTheDocument();
  });

  it('renders notification toggles with switch roles', () => {
    render(<SettingsForm />);

    expect(screen.getByRole('switch', { name: 'Email notifications' })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: 'Push notifications' })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: 'Marketing emails' })).toBeInTheDocument();
  });

  it('renders theme selector with Light, Dark, and System options', () => {
    render(<SettingsForm />);

    const themeSelect = screen.getByLabelText('Theme');
    expect(themeSelect).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Dark' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'System default' })).toBeInTheDocument();
  });

  it('renders Public and Private privacy options', () => {
    render(<SettingsForm />);

    expect(screen.getByRole('radio', { name: /Public/ })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Private/ })).toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: /Team only/ })).not.toBeInTheDocument();
  });

  it('shows validation errors for empty required fields on submit', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/Bio/), 'test');
    await user.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(await screen.findByText('Display name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
  });

  it('shows email format error for invalid email', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText('Display name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email address'), 'bad-email');
    await user.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument();
  });

  it('enforces bio max length via maxLength attribute', () => {
    render(<SettingsForm />);

    const bioField = screen.getByLabelText(/Bio/);
    expect(bioField).toHaveAttribute('maxlength', String(BIO_MAX_LENGTH));
    expect(screen.getByText(`0/${BIO_MAX_LENGTH}`)).toBeInTheDocument();
  });

  it('marks required fields with aria-required', () => {
    render(<SettingsForm />);

    expect(screen.getByLabelText('Display name')).toHaveAttribute('aria-required', 'true');
    expect(screen.getByLabelText('Email address')).toHaveAttribute('aria-required', 'true');
  });

  it('sets aria-invalid when validation fails', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/Bio/), 'test');
    await user.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(await screen.findByText('Display name is required.')).toBeInTheDocument();
    expect(screen.getByLabelText('Display name')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Email address')).toHaveAttribute('aria-invalid', 'true');
  });
});
