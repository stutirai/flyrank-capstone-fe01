import type { ReactNode } from 'react';
import './SettingsForm.css';

interface FormSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="settings__section" aria-labelledby={`section-${title}`}>
      <h2 id={`section-${title}`} className="settings__section-title">
        {title}
      </h2>
      <p className="settings__section-description">{description}</p>
      {children}
    </section>
  );
}
