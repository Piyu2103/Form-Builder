export type FieldType = 'text' | 'number' | 'select';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  options?: string[]; // For select fields
  value?: string | number;
}

export interface Form {
  id: string;
  title: string;
  fields: FormField[];
}