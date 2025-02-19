import { Form } from '../types/form';

const FORM_KEY = 'form_builder_data';

export const saveForm = async (form: Form): Promise<void> => {
  // Don't save if there's no form or if fields array is empty
  if (!form || !form.fields) {
    localStorage.removeItem(FORM_KEY);
    return;
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  localStorage.setItem(FORM_KEY, JSON.stringify(form));
};

export const loadForm = async (): Promise<Form | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const data = localStorage.getItem(FORM_KEY);
  if (!data) return null;
  
  try {
    const form = JSON.parse(data);
    // Ensure we have valid form data
    if (!form || !Array.isArray(form.fields)) {
      localStorage.removeItem(FORM_KEY);
      return null;
    }
    return form;
  } catch (error) {
    localStorage.removeItem(FORM_KEY);
    return null;
  }
};