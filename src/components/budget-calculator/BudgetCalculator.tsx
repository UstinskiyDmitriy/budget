import { useState } from "react";
import styles from "./BudgetCalculator.module.css";
import { useCategory } from "../../hooks/useCategory";
import Display from "../display/Display";
import ButtonsPanel from "../button-panel/ButtonPanel";
import CategorySelector from "../category-selector/CategorySelector";
import { useLocation } from "react-router-dom";

export default function BudgetCalculator({ onCalculate }: { onCalculate: (amount: number, category: string) => void }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [, setSelectedCategory] = useState("");
  const { type, showCategories, handleCategoryToggle } = useCategory();
  const location = useLocation()
  const handleInput = (value: string) => {
    setInput((prev) => prev + value);
    handleCategoryToggle(true);
  };

  const calculateResult = () => {
    try {
      const amount = Function(`"use strict"; return (${input})`)();
      if (isNaN(amount)) {
        return null;
      }
      return amount;
    } catch {
      return null;
    }
  };

  const handleCalculate = () => {
    const amount = calculateResult();
    if (amount !== null) {
      setResult(amount);
    } else {
      setResult(null);
    }
  };

  const clearInput = () => {
    setInput("");
    setResult(null);
    handleCategoryToggle(false);
    setSelectedCategory("");
  };

  const handleCategorySelect = (category: string) => {
    let amount = result;
    if (amount === null && input !== "") {
      amount = calculateResult();
    }
    if (amount === null) {
      amount = parseFloat(input);
      if (isNaN(amount)) {
        alert("Пожалуйста, введите корректное значение.");
        return;
      }
    }
    onCalculate(amount, category); 
    clearInput();
    setSelectedCategory(category);
  };

  return (
    <div className= {`${styles.container}, ${location.pathname === '/income' ? styles.income : styles.expenses }`}>
      <Display input={input} result={result} />
      <ButtonsPanel onInput={handleInput} onClear={clearInput} onCalculate={handleCalculate} />
      {showCategories && (
        <CategorySelector categories={type} onSelect={handleCategorySelect} />
      )}
    </div>
  );
}