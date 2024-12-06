import { useState } from 'react';
import BalanceModal from '../modal/BalanceModal';
import styles from './Balance.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setNewBalance} from '../../store/slices/budgedSlice';

export default function Balance() {
  const dispatch = useDispatch();
  const balance = useSelector((state:RootState) => state.budget.balance)
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const updateBudget = (newBalance: number) => {
    dispatch(setNewBalance(newBalance))
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper} onClick={showModal}>
        <p>Мои деньги</p>
        <span>{balance} ₽</span>
      </div>
      <BalanceModal open={open} setOpen={setOpen} updateBalance={updateBudget} />
    </div>
  );
}
