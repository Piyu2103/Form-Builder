import * as yup from 'yup';
import { Form, FormField } from '../types/form';

export const fieldSchema = yup.object().shape({
  id: yup.string().required(),
  type: yup.string().oneOf(['text', 'number', 'select']).required(),
  label: yup.string().required('Label is required'),
  required: yup.boolean(),
  options: yup.array().of(yup.string()).when('type', {
    is: 'select',
    then: schema => schema.min(1, 'Select field must have at least one option'),
  }),
  value: yup.mixed(),
});

export const formSchema = yup.object().shape({
  id: yup.string().required(),
  title: yup.string().required('Form title is required'),
  fields: yup.array().of(fieldSchema).min(1, 'Form must have at least one field'),
});

export const validateForm = async (form: Form): Promise<boolean> => {
  try {
    await formSchema.validate(form, { abortEarly: false });
    return true;
  } catch (error) {
    return false;
  }
};

export const validateField = async (field: FormField): Promise<boolean> => {
  try {
    await fieldSchema.validate(field, { abortEarly: false });
    return true;
  } catch (error) {
    return false;
  }
};