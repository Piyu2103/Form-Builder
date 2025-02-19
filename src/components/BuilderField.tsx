import React from 'react';
import { Trash2, PlusCircle } from 'lucide-react';
import { FormField } from '../types/form';

interface BuilderFieldProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onRemove: () => void;
}

const BuilderField: React.FC<BuilderFieldProps> = ({ field, onUpdate, onRemove }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
          className="text-lg font-medium outline-none p-2 rounded-md border border-gray-200 focus:border-blue-500 w-full mr-4"
          placeholder="Field Label"
        />
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 p-2"
          type="button"
          aria-label="Remove field"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center bg-gray-50 p-2 rounded-md">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="mr-2 w-4 h-4 text-blue-500"
          />
          Required
        </label>

        {field.type === 'select' && (
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {field.options?.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...(field.options || [])];
                    newOptions[index] = e.target.value;
                    onUpdate({ options: newOptions });
                  }}
                  className="border p-2 rounded-md focus:border-blue-500 outline-none"
                  aria-label={`Option ${index + 1}`}
                />
              ))}
              <button
                onClick={() =>
                  onUpdate({
                    options: [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`],
                  })
                }
                className="text-blue-500 hover:text-blue-700 p-2"
                type="button"
                aria-label="Add option"
              >
                <PlusCircle size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderField;