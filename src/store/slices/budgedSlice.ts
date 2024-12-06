import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

const BUDGET_STORAGE_KEY = 'budget_balance';

interface BudgetState {
  balance: number;
}

const initialState: BudgetState = {
  balance: loadFromLocalStorage(BUDGET_STORAGE_KEY) ?? 0,
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    updateBalance(state, action: PayloadAction<number>) {
      state.balance += action.payload;
      saveToLocalStorage(BUDGET_STORAGE_KEY, state.balance);
    },
    setNewBalance(state, action: PayloadAction<number>){
      state.balance = action.payload
      saveToLocalStorage(BUDGET_STORAGE_KEY, state.balance);
    },
  },
});

export const { updateBalance, setNewBalance } = budgetSlice.actions;
export default budgetSlice.reducer;