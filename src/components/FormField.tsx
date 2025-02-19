import React from 'react';
import { FormField as IFormField } from '../types/form';

interface FormFieldProps {
  field: IFormField;
  value: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, disabled }) => {
  if (field.type === 'select') {
    return (
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        required={field.required}
        disabled={disabled}
      >
        <option value="">Select an option</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={field.type}
      value={value || ''}
      onChange={(e) => onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)}
      className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      required={field.required}
      disabled={disabled}
      {...(field.type === 'number' && {
        min: 0,
        step: 1,
        pattern: '[0-9]*'
      })}
    />
  );
};

export default FormField;