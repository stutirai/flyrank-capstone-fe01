import { useState } from 'react';
import type { FormEvent } from 'react';
import { FormField } from './FormField';
import { FormSection } from './FormSection';
import { RadioGroup } from './RadioGroup';
import { Toggle } from './Toggle';
import {
  BIO_MAX_LENGTH,
  defaultSettings,
  type SettingsFormData,
  type SettingsFormErrors,
  type Theme,
  type ProfileVisibility,
} from '../types/settings';
import { validateSettings, hasErrors } from '../utils/validateSettings';
import './SettingsForm.css';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const PRIVACY_OPTIONS = [
  { value: 'public' as const, label: 'Public', description: 'Anyone can view your profile.' },
  { value: 'private' as const, label: 'Private', description: 'Only you can see your profile.' },
];

export default function SettingsForm() {
  const [formData, setFormData] = useState<SettingsFormData>(defaultSettings);
  const [errors, setErrors] = useState<SettingsFormErrors>({});
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [isDirty, setIsDirty] = useState(false);

  function updateField<K extends keyof SettingsFormData>(
    field: K,
    value: SettingsFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    setSaveStatus('idle');

    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof SettingsFormErrors];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validateSettings(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setSaveStatus('saving');

    await new Promise((resolve) => setTimeout(resolve, 800));

    setSaveStatus('saved');
    setIsDirty(false);
    setTimeout(() => setSaveStatus('idle'), 2500);
  }

  function handleReset() {
    setFormData(defaultSettings);
    setErrors({});
    setIsDirty(false);
    setSaveStatus('idle');
  }

  return (
    <div className="settings">
      <header className="settings__header">
        <h1 className="settings__title">Settings</h1>
        <p className="settings__subtitle">
          Manage your account preferences and notification settings.
        </p>
      </header>

      <form className="settings__form" onSubmit={handleSubmit} noValidate aria-label="Account settings">
        <FormSection
          title="Profile"
          description="Update your personal information visible to others."
        >
          <FormField
            id="displayName"
            label="Display name"
            type="text"
            value={formData.displayName}
            onChange={(e) => updateField('displayName', e.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
            required
            error={errors.displayName}
          />

          <FormField
            id="email"
            label="Email address"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="jane@example.com"
            autoComplete="email"
            required
            error={errors.email}
          />

          <FormField
            as="textarea"
            id="bio"
            label="Bio"
            optional
            value={formData.bio}
            onChange={(e) => updateField('bio', e.target.value)}
            placeholder="A short bio about yourself..."
            rows={3}
            maxLength={BIO_MAX_LENGTH}
            error={errors.bio}
          />
        </FormSection>

        <FormSection
          title="Notifications"
          description="Choose how you want to be notified about activity."
        >
          <div className="settings__toggles">
            <Toggle
              id="emailNotifications"
              label="Email notifications"
              description="Receive updates about your account via email."
              checked={formData.emailNotifications}
              onChange={(checked) => updateField('emailNotifications', checked)}
            />
            <Toggle
              id="pushNotifications"
              label="Push notifications"
              description="Get real-time alerts in your browser."
              checked={formData.pushNotifications}
              onChange={(checked) => updateField('pushNotifications', checked)}
            />
            <Toggle
              id="marketingEmails"
              label="Marketing emails"
              description="Product news, tips, and feature announcements."
              checked={formData.marketingEmails}
              onChange={(checked) => updateField('marketingEmails', checked)}
            />
          </div>
        </FormSection>

        <FormSection
          title="Appearance"
          description="Customize how the app looks and feels."
        >
          <FormField
            as="select"
            id="theme"
            label="Theme"
            value={formData.theme}
            onChange={(e) => updateField('theme', e.target.value as Theme)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System default</option>
          </FormField>
        </FormSection>

        <FormSection
          title="Privacy"
          description="Control who can see your profile information."
        >
          <RadioGroup
            name="profileVisibility"
            legend="Profile visibility"
            options={PRIVACY_OPTIONS}
            value={formData.profileVisibility}
            onChange={(value) => updateField('profileVisibility', value as ProfileVisibility)}
          />
        </FormSection>

        <footer className="settings__footer">
          <div className="settings__status" aria-live="polite">
            {saveStatus === 'saved' && (
              <span className="settings__status-message settings__status-message--success">
                Settings saved successfully.
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="settings__status-message settings__status-message--error">
                Failed to save. Please try again.
              </span>
            )}
          </div>

          <div className="settings__actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleReset}
              disabled={saveStatus === 'saving'}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={saveStatus === 'saving' || !isDirty}
            >
              {saveStatus === 'saving' ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
