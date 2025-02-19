import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { Form, FormField, FieldType } from '../types/form';
import { saveForm, loadForm } from '../utils/storage';
import { validateForm } from '../utils/validation';
import BuilderField from './BuilderField';
import LoadingSpinner from './LoadingSpinner';

const FormBuilder: React.FC = () => {
  const [form, setForm] = useState<Form>({
    id: uuidv4(),
    title: '',
    fields: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadForm().then((savedForm) => {
      if (savedForm) {
        setForm(savedForm);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const saveTimeout = setTimeout(async () => {
      if (!loading) {
        if (form.fields.length === 0) {
          await saveForm(null as any);
          return;
        }
        
        const isValid = await validateForm(form);
        if (isValid) {
          await saveForm(form);
          toast.success('Form auto-saved');
        }
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [form, loading]);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: uuidv4(),
      type,
      label: `New ${type} field`,
      required: false,
      ...(type === 'select' && { options: ['Option 1'] }),
    };

    setForm((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      ),
    }));
  };

  const removeField = async (fieldId: string) => {
    setForm((prevForm) => {
      const updatedFields = prevForm.fields.filter((field) => field.id !== fieldId);
      return {
        ...prevForm,
        fields: updatedFields,
      };
    });
    
    setTimeout(async () => {
      const updatedForm = {
        ...form,
        fields: form.fields.filter(field => field.id !== fieldId)
      };
      await saveForm(updatedForm);
      toast.success('Field removed');
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Form Title"
          className="text-2xl font-bold w-full mb-6 p-3 border-b-2 border-gray-200 focus:border-blue-500 outline-none rounded-lg"
        />

        <div className="space-y-4">
          {form.fields.map((field) => (
            <BuilderField
              key={field.id}
              field={field}
              onUpdate={(updates) => updateField(field.id, updates)}
              onRemove={() => removeField(field.id)}
            />
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => addField('text')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            type="button"
          >
            Add Text Field
          </button>
          <button
            onClick={() => addField('number')}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            type="button"
          >
            Add Number Field
          </button>
          <button
            onClick={() => addField('select')}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            type="button"
          >
            Add Select Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;