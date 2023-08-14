import styles from "./styles.module.less";

interface IBtn {
  spanText?: string;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ spanText, className, onClick }: IBtn) => {
  return (
    <button onClick={onClick} className={className ? styles[className] : ""}>
      <span>{spanText}</span>
    </button>
  );
};
