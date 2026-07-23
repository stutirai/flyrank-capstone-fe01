import { useState } from 'react';
import type { FormEvent } from 'react';
import { Toggle } from './Toggle';
import {
  defaultSettings,
  type SettingsFormData,
  type SettingsFormErrors,
  type Theme,
  type ProfileVisibility,
} from '../types/settings';
import { validateSettings, hasErrors } from '../utils/validateSettings';
import './SettingsForm.css';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

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

      <form className="settings__form" onSubmit={handleSubmit} noValidate>
        <section className="settings__section">
          <h2 className="settings__section-title">Profile</h2>
          <p className="settings__section-description">
            Update your personal information visible to others.
          </p>

          <div className="field">
            <label htmlFor="displayName" className="field__label">
              Display name
            </label>
            <input
              id="displayName"
              type="text"
              className={`field__input ${errors.displayName ? 'field__input--error' : ''}`}
              value={formData.displayName}
              onChange={(e) => updateField('displayName', e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
            />
            {errors.displayName && (
              <span className="field__error" role="alert">
                {errors.displayName}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="email" className="field__label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className={`field__input ${errors.email ? 'field__input--error' : ''}`}
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="jane@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <span className="field__error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="bio" className="field__label">
              Bio
              <span className="field__label-hint">optional</span>
            </label>
            <textarea
              id="bio"
              className={`field__input field__textarea ${errors.bio ? 'field__input--error' : ''}`}
              value={formData.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              placeholder="A short bio about yourself..."
              rows={3}
              maxLength={300}
            />
            <div className="field__footer">
              {errors.bio ? (
                <span className="field__error" role="alert">
                  {errors.bio}
                </span>
              ) : (
                <span />
              )}
              <span className="field__counter">{formData.bio.length}/300</span>
            </div>
          </div>
        </section>

        <section className="settings__section">
          <h2 className="settings__section-title">Notifications</h2>
          <p className="settings__section-description">
            Choose how you want to be notified about activity.
          </p>

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
        </section>

        <section className="settings__section">
          <h2 className="settings__section-title">Appearance</h2>
          <p className="settings__section-description">
            Customize how the app looks and feels.
          </p>

          <div className="field">
            <label htmlFor="theme" className="field__label">
              Theme
            </label>
            <select
              id="theme"
              className="field__input field__select"
              value={formData.theme}
              onChange={(e) => updateField('theme', e.target.value as Theme)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System default</option>
            </select>
          </div>

          <Toggle
            id="compactMode"
            label="Compact mode"
            description="Reduce spacing for a denser layout."
            checked={formData.compactMode}
            onChange={(checked) => updateField('compactMode', checked)}
          />
        </section>

        <section className="settings__section">
          <h2 className="settings__section-title">Privacy</h2>
          <p className="settings__section-description">
            Control who can see your profile information.
          </p>

          <fieldset className="radio-group">
            <legend className="sr-only">Profile visibility</legend>
            {(
              [
                { value: 'public', label: 'Public', desc: 'Anyone can view your profile.' },
                { value: 'team', label: 'Team only', desc: 'Only your team members can see your profile.' },
                { value: 'private', label: 'Private', desc: 'Only you can see your profile.' },
              ] as const
            ).map(({ value, label, desc }) => (
              <label key={value} className="radio-option">
                <input
                  type="radio"
                  name="profileVisibility"
                  value={value}
                  checked={formData.profileVisibility === value}
                  onChange={() => updateField('profileVisibility', value as ProfileVisibility)}
                  className="radio-option__input"
                />
                <span className="radio-option__indicator" />
                <span className="radio-option__content">
                  <span className="radio-option__label">{label}</span>
                  <span className="radio-option__desc">{desc}</span>
                </span>
              </label>
            ))}
          </fieldset>
        </section>

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
