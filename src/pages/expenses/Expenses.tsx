import { useDispatch, useSelector } from 'react-redux';
import BudgetCalculator from '../../components/budget-calculator/BudgetCalculator';
import BudgetCard from '../../components/budget-card/BudgetCard';
import styles from './Expenses.module.css';
import { addRecord, deleteRecord, selectExpenseRecords } from '../../store/slices/recordSlice';
import { updateBalance } from '../../store/slices/budgedSlice';
import History from '../../components/history-transactions/History';

export default function Expenses() {
  const dispatch = useDispatch();
  const expenseRecords = useSelector(selectExpenseRecords);

  const handleAddExpense = (amount: number, category: string) => {
    dispatch(addRecord({ type: 'expense', amount, category }));
    dispatch(updateBalance(-amount)); // Уменьшаем баланс на расход
  };

  const handleDeleteExpense = (id: string) => {
    const recordToDelete = expenseRecords.find(record => record.id === id);
    if (recordToDelete) {
      dispatch(deleteRecord(id));
      dispatch(updateBalance(recordToDelete.amount)); // Возвращаем сумму расхода к балансу
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.calculator}>
        <BudgetCalculator onCalculate={handleAddExpense} />
      </div>
      <div className={styles.today}>
        <p>Потрачено сегодня: {expenseRecords.reduce((acc, record) => acc + record.amount, 0)} ₽</p>
      </div>

      <History title={'историю расходов'}>
      <div style={{ display: 'flex', flexDirection:'column-reverse', gap: '15px', width:'100%' }}>
        {expenseRecords.length === 0 && (
          <span style={{textAlign:'center', fontSize:'22px'}}>Добавьте статью расходов</span>
        )}
        {expenseRecords.map(record => (
          <BudgetCard
            key={record.id}
            id={record.id}
            category={record.category}
            amount={record.amount}
            date={record.date}
            onDelete={handleDeleteExpense}
          />
        ))}
      </div>
      </History>
      
    </div>
  );
}
