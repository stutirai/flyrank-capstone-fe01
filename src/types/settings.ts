export type Theme = 'light' | 'dark' | 'system';

export type ProfileVisibility = 'public' | 'team' | 'private';

export interface SettingsFormData {
  displayName: string;
  email: string;
  bio: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  theme: Theme;
  compactMode: boolean;
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
  compactMode: false,
  profileVisibility: 'team',
};

export interface SettingsFormErrors {
  displayName?: string;
  email?: string;
  bio?: string;
}
