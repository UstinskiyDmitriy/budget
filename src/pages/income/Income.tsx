import { useDispatch, useSelector } from 'react-redux';
import BudgetCalculator from '../../components/budget-calculator/BudgetCalculator';
import BudgetCard from '../../components/budget-card/BudgetCard';
import styles from './Income.module.css';
import { addRecord, deleteRecord, selectIncomeRecords } from '../../store/slices/recordSlice';
import { updateBalance } from '../../store/slices/budgedSlice';
import History from '../../components/history-transactions/History';

export default function Income() {
  const dispatch = useDispatch();
  const incomeRecords = useSelector(selectIncomeRecords);

  const handleAddIncome = (amount: number, category: string) => {
    dispatch(addRecord({ type: 'income', amount, category }));
    dispatch(updateBalance(amount)); // Добавляем доход к балансу
  };

  const handleDeleteIncome = (id: string) => {
    const recordToDelete = incomeRecords.find(record => record.id === id);
    if (recordToDelete) {
      dispatch(deleteRecord(id));
      dispatch(updateBalance(-recordToDelete.amount)); // Убираем доход из баланса
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.calculator}>
        <BudgetCalculator onCalculate={handleAddIncome} />
      </div>
      <div className={styles.today}>
        <p>Заработано сегодня: {incomeRecords.reduce((acc, record) => acc + record.amount, 0)} ₽</p>
      </div>
      <History title={'Открыть историю доходов'}>
      <div style={{ display: 'flex', flexDirection:'column-reverse', gap: '15px', width:'100%' }}>
      {incomeRecords.length === 0 && (
          <span style={{textAlign:'center', fontSize:'22px'}}>Добавьте статью доходов</span>
        )}
        {incomeRecords.map(record => (
          <BudgetCard
            key={record.id}
            id={record.id}
            category={record.category}
            amount={record.amount}
            date={record.date}
            onDelete={handleDeleteIncome}
          />
        ))}
      </div>
      </History>
      
    </div>
  );
}
