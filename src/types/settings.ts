export type Theme = 'light' | 'dark' | 'system';

export type ProfileVisibility = 'public' | 'private';

export const BIO_MAX_LENGTH = 200;

export interface SettingsFormData {
  displayName: string;
  email: string;
  bio: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  theme: Theme;
  profileVisibility: ProfileVisibility;
}

export const defaultSettings: SettingsFormData = {
  displayName: '',
  email: '',
  bio: '',
  emailNotifications: true,
  pushNotifications: false,
  marketingEmails: false,
  theme: 'system',
  profileVisibility: 'private',
};

export interface SettingsFormErrors {
  displayName?: string;
  email?: string;
  bio?: string;
}
