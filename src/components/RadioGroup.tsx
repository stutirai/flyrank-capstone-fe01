import './SettingsForm.css';

export interface RadioOption<T extends string> {
  value: T;
  label: string;
  description: string;
}

interface RadioGroupProps<T extends string> {
  name: string;
  legend: string;
  options: readonly RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function RadioGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <fieldset className="radio-group">
      <legend className="sr-only">{legend}</legend>
      {options.map(({ value: optionValue, label, description }) => {
        const inputId = `${name}-${optionValue}`;

        return (
          <label key={optionValue} htmlFor={inputId} className="radio-option">
            <input
              id={inputId}
              type="radio"
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={() => onChange(optionValue)}
              className="radio-option__input"
              aria-describedby={`${inputId}-desc`}
            />
            <span className="radio-option__indicator" aria-hidden="true" />
            <span className="radio-option__content">
              <span className="radio-option__label">{label}</span>
              <span id={`${inputId}-desc`} className="radio-option__desc">
                {description}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
