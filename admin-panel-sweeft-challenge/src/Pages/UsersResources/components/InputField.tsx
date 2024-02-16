import React from "react";
import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";
import { DeepMap } from "react-hook-form/dist/types/utils";
import { EditI } from "../../Authorization/components/SignInOrSignUp";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
  errors: DeepMap<FieldValues, FieldError>;
  required?: boolean;
  validate?: (val: string) => any;
  minLength?: number;
  type?: string;
  defaultValue?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  name,
  register,
  errors,
  required = false,
  validate,
  minLength,
  type = "text",
  defaultValue,
}): JSX.Element => {
  return (
    <div>
      {label && <p>{label}</p>}
      <input
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: required ? "Field is required" : false,
          ...(minLength !== undefined && {
            minLength: {
              value: minLength,
              message: `Minimum length is ${minLength}`,
            },
          }),
          validate:
            validate && ((val: string) => validate(val) || "Invalid input"),
        })}
      />
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
};

export default InputField;
