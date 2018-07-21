export interface IFormField {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: any;
  validators?: IFormValidators;
  options?: IFormFieldOption[];
  multiple?: boolean;
  canAdd?: boolean;
  isVisible?: boolean;
  config?: any;
  disabled?: boolean;
  classNames?: string;
  content?: string;
}

export interface IFormFieldOption {
  id?: string;
  label?: string;
  value?: any;
  name?: any;
}

export interface IFormValidators {
  [type: string]: {
    value?: any;
    message?: string;
  };
}
