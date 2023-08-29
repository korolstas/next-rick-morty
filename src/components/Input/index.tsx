import {
  ControllerRenderProps,
  FieldValues,
  Controller,
} from "react-hook-form";

import styles from "./input.module.less";

type FormFieldType = ControllerRenderProps<FieldValues, string>;

interface Props {
  error?: string;
  name: string;
  type: string;
  placeHolder?: string;
}

export const Input = ({ name, type, placeHolder, error }: Props) => {
  const spanError = error || null;

  const renderInput = ({ field }: { field: FormFieldType }) => {
    return (
      <>
        <input
          style={{
            border: `2px solid ${error ? "red" : "#06ea4e"}`,
          }}
          type={type}
          className={styles.modal_input}
          placeholder={placeHolder}
          {...field}
        />
        <span className={styles.error}>{spanError}</span>
      </>
    );
  };

  return <Controller name={name} render={renderInput} />;
};
