import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import './SettingsForm.css';

const slugify = (id: string) => id.replace(/\s+/g, '-').toLowerCase();

interface BaseFieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  required?: boolean;
}

interface TextFieldProps extends BaseFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  type?: 'text' | 'email';
  as?: 'input';
}

interface TextareaFieldProps extends BaseFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  as: 'textarea';
  maxLength?: number;
  value: string;
}

interface SelectFieldProps extends BaseFieldProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  as: 'select';
  children: React.ReactNode;
}

type FormFieldProps = TextFieldProps | TextareaFieldProps | SelectFieldProps;

export function FormField(props: FormFieldProps) {
  const { id, label, optional, error, required } = props;
  const errorId = `${slugify(id)}-error`;
  const counterId = `${slugify(id)}-counter`;
  const hasError = Boolean(error);

  const ariaDescribedBy = [
    hasError ? errorId : null,
    props.as === 'textarea' && props.maxLength ? counterId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  const inputClassName = `field__input ${hasError ? 'field__input--error' : ''}`;

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
        {optional && <span className="field__label-hint">optional</span>}
      </label>

      {props.as === 'textarea' ? (
        <textarea
          id={id}
          className={`${inputClassName} field__textarea`}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          rows={props.rows ?? 3}
          maxLength={props.maxLength}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={ariaDescribedBy}
        />
      ) : props.as === 'select' ? (
        <select
          id={id}
          className={`${inputClassName} field__select`}
          value={props.value}
          onChange={props.onChange}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        >
          {props.children}
        </select>
      ) : (
        <input
          id={id}
          type={props.type ?? 'text'}
          className={inputClassName}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        />
      )}

      {props.as === 'textarea' && props.maxLength !== undefined ? (
        <div className="field__footer">
          {hasError ? (
            <span id={errorId} className="field__error" role="alert">
              {error}
            </span>
          ) : (
            <span />
          )}
          <span id={counterId} className="field__counter" aria-live="polite">
            {props.value.length}/{props.maxLength}
          </span>
        </div>
      ) : (
        hasError && (
          <span id={errorId} className="field__error" role="alert">
            {error}
          </span>
        )
      )}
    </div>
  );
}
