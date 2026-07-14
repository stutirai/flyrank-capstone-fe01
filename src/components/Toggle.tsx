import './SettingsForm.css';

interface ToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ id, label, description, checked, onChange }: ToggleProps) {
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className="toggle-field">
      <div className="toggle-field__text">
        <label htmlFor={id} className="toggle-field__label">
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="toggle-field__description">
            {description}
          </p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={descriptionId}
        className={`toggle ${checked ? 'toggle--on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="toggle__thumb" aria-hidden="true" />
      </button>
    </div>
  );
}
