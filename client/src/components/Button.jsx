import styles from "../styles/Bottom.module.css";
function Button({ text, className, onClick }) {
  return (
    <a className={`${styles.btn} ${className}`} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </a>
  );
}

export default Button;
