import type { SettingsFormData, SettingsFormErrors } from '../types/settings';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSettings(data: SettingsFormData): SettingsFormErrors {
  const errors: SettingsFormErrors = {};

  if (!data.displayName.trim()) {
    errors.displayName = 'Display name is required.';
  } else if (data.displayName.trim().length < 2) {
    errors.displayName = 'Display name must be at least 2 characters.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (data.bio.length > 300) {
    errors.bio = 'Bio must be 300 characters or fewer.';
  }

  return errors;
}

export function hasErrors(errors: SettingsFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
