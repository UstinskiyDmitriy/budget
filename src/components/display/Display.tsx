import styles from "./Display.module.css";

interface DisplayProps {
  input: string;
  result: number | null;
}

export default function Display({ input, result }: DisplayProps) {
  return (
    <div className={styles.display}>
      <div>{input || "0"}</div>
      {result !== null && <div className={styles.result}>Результат: {result}</div>}
    </div>
  );
}
