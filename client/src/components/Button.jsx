import styles from "../styles/Bottom.module.css"; 
function Button({ text, className }) {
  return (
    <a className={`${styles.btn} ${className}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </a>
  );
}

export default Button;
