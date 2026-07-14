import { describe, it, expect } from 'vitest';
import { validateSettings, hasErrors } from './validateSettings';
import { defaultSettings, BIO_MAX_LENGTH } from '../types/settings';

describe('validateSettings', () => {
  it('returns no errors for valid data', () => {
    const data = {
      ...defaultSettings,
      displayName: 'Jane Doe',
      email: 'jane@example.com',
      bio: 'Hello world',
    };

    expect(validateSettings(data)).toEqual({});
    expect(hasErrors(validateSettings(data))).toBe(false);
  });

  it('requires display name', () => {
    const errors = validateSettings({ ...defaultSettings, displayName: '   ' });
    expect(errors.displayName).toBe('Display name is required.');
  });

  it('requires display name to be at least 2 characters', () => {
    const errors = validateSettings({ ...defaultSettings, displayName: 'A' });
    expect(errors.displayName).toBe('Display name must be at least 2 characters.');
  });

  it('requires email', () => {
    const errors = validateSettings({ ...defaultSettings, displayName: 'Jane', email: '' });
    expect(errors.email).toBe('Email is required.');
  });

  it('validates email format', () => {
    const errors = validateSettings({
      ...defaultSettings,
      displayName: 'Jane',
      email: 'not-an-email',
    });
    expect(errors.email).toBe('Enter a valid email address.');
  });

  it('accepts valid email formats', () => {
    const validEmails = ['user@example.com', 'first.last@company.co.uk', 'a@b.co'];

    for (const email of validEmails) {
      const errors = validateSettings({ ...defaultSettings, displayName: 'Jane', email });
      expect(errors.email).toBeUndefined();
    }
  });

  it('rejects bio longer than 200 characters', () => {
    const bio = 'a'.repeat(BIO_MAX_LENGTH + 1);
    const errors = validateSettings({
      ...defaultSettings,
      displayName: 'Jane',
      email: 'jane@example.com',
      bio,
    });
    expect(errors.bio).toBe(`Bio must be ${BIO_MAX_LENGTH} characters or fewer.`);
  });

  it('allows bio up to 200 characters', () => {
    const bio = 'a'.repeat(BIO_MAX_LENGTH);
    const errors = validateSettings({
      ...defaultSettings,
      displayName: 'Jane',
      email: 'jane@example.com',
      bio,
    });
    expect(errors.bio).toBeUndefined();
  });
});
