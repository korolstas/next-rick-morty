import styles from "./style.module.less";

interface Input {
  value?: string;
  placeholder: string;
}

export const Input = ({ value, placeholder }: Input) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.input}
      value={value}
    />
  );
};
