import './SettingsForm.css';

interface ToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ id, label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="toggle-field">
      <div className="toggle-field__text">
        <label htmlFor={id} className="toggle-field__label">
          {label}
        </label>
        {description && <p className="toggle-field__description">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        className={`toggle ${checked ? 'toggle--on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="toggle__thumb" />
      </button>
    </div>
  );
}
