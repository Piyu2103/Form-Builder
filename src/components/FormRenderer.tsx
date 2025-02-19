import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Form } from '../types/form';
import { loadForm } from '../utils/storage';
import FormField from './FormField';
import LoadingSpinner from './LoadingSpinner';
import SubmitButton from './SubmitButton';

const FormRenderer: React.FC = () => {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<Record<string, string | number>>({});

  useEffect(() => {
    loadForm().then((savedForm) => {
      if (savedForm) {
        setForm(savedForm);
        const initialValues: Record<string, string | number> = {};
        savedForm.fields.forEach((field) => {
          if (field.value !== undefined) {
            initialValues[field.id] = field.value;
          }
        });
        setValues(initialValues);
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const missingFields = form?.fields.filter(
      (field) => field.required && !values[field.id]
    );

    if (missingFields && missingFields.length > 0) {
      toast.error(`Please fill in required fields: ${missingFields.map(f => f.label).join(', ')}`);
      setSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setValues({});
      toast.success('Form submitted successfully!');
      console.log('Form values:', values);
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-500">No form found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">{form.title}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {form.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <FormField
                field={field}
                value={values[field.id] || ''}
                onChange={(value) => setValues((prev) => ({ ...prev, [field.id]: value }))}
                disabled={submitting}
              />
            </div>
          ))}
          
          <div className="mt-6">
            <SubmitButton
              isSubmitting={submitting}
              text="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRenderer;