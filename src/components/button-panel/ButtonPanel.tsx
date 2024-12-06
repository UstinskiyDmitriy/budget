import styles from "./ButtonPanel.module.css";

interface ButtonsPanelProps {
  onInput: (value: string) => void;
  onCalculate: () => void;
  onClear: () => void;
}

export default function ButtonsPanel({ onInput, onCalculate, onClear }: ButtonsPanelProps) {
  const buttonValues = [
    [1, 4, 7, "="],
    [2, 5, 8, "C"],
    [3, 6, 9, 0],
    ["+", "-", "*", "/"],
  ];

  return (
    <div className={styles.buttons}>
      {buttonValues.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((val) => {
            const isEqualButton = val === "=";
            const isClearButton = val === "C";

            return (
              <button
                key={val}
                onClick={
                  isEqualButton
                    ? onCalculate
                    : isClearButton
                    ? onClear
                    : () => onInput(val.toString())
                }
              >
                {val}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}