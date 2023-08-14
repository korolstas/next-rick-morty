import React, { forwardRef } from "react";
import { IForm } from "../Form/InterfaceForm";
import styles from "./input.module.less";
import { useFormContext } from "react-hook-form";

export const Input = forwardRef(
  ({ placeHolder, className, type, label, name, accept }: IForm) => {
    const { register } = useFormContext();

    return label ? (
      <div className={className ? styles[className] : ""}>
        <input
          {...register(name, { required: true })}
          type={type}
          className={className ? styles[className] : ""}
          placeholder={placeHolder}
          accept={accept}
          required
        />
        {label && <label>{label}</label>}
      </div>
    ) : (
      <>
        <input
          {...register(name)}
          type={type}
          className={className ? styles[className] : ""}
          placeholder={placeHolder}
          accept={accept}
          required
        />
      </>
    );
  }
);
