import React from "react";
import { IForm } from "../InterfaceForm";
import { Input } from "../../Input/Input";

const formTypes = {
  text: "text",
  select: "select",
  password: "password",
  radio: "radio",
  checkbox: "checkbox",
  hidden: "hidden",
  button: "button",
  submit: "submit",
  reset: "reset",
  file: "file",
  color: "color",
  date: "date",
  datetime_local: "datetime-local",
  email: "email",
  month: "month",
  number: "number",
  range: "range",
  search: "search",
  tel: "tel",
  time: "time",
  url: "url",
  week: "week",
};

export const FormInput = ({
  placeHolder,
  className,
  label,
  accept,
  name,
  type,
}: IForm) => {
  switch (type) {
    case formTypes.text:
      return (
        <Input
          type={type}
          name={name}
          className={className}
          placeHolder={placeHolder}
        />
      );
    case formTypes.email:
      return (
        <Input
          type={type}
          name={name}
          className={className}
          placeHolder={placeHolder}
        />
      );
    case formTypes.password:
      return (
        <Input
          type={type}
          name={name}
          className={className}
          placeHolder={placeHolder}
        />
      );
    case formTypes.checkbox:
      return (
        <Input 
          type={type} 
          name={name} 
          className={className} 
          label={label} 
        />
      );
    case formTypes.file:
      return (
        <Input 
          type={type} 
          name={name} 
          className={className} 
          label={label} 
          accept={accept}
        />
      );

    default:
      return null;
  }
};
