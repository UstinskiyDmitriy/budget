import { useLocation } from 'react-router-dom';
import styles from './BudgetCard.module.css';

interface BudgetCardProps {
  id: string;
  category: string;
  amount: number;
  date: string;
  onDelete: (id: string) => void;
}

export default function BudgetCard({ id, category, amount, date, onDelete }: BudgetCardProps) {

  const location = useLocation()

  return (
    <div className={`${location.pathname === '/income' ? styles.income : styles.expenses}`}>
      <p>Категория: {category}</p>
      <p>Сумма: {amount} ₽</p>
      <p>Дата: {date}</p>
      <button onClick={() => onDelete(id)} className={`${location.pathname === '/income' ? styles.delete_button_income : styles.delete_button_expenses}`}>
        Удалить
      </button>
    </div>
  );
}
