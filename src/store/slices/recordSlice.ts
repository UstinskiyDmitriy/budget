import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { createSelector } from 'reselect';
import { RootState } from '../store';
import { Record } from '../../types/types';


interface RecordsState {
  records: Record[];
}

const STORAGE_KEY = 'budget_records';
const initialState: RecordsState = {
  records: loadFromLocalStorage(STORAGE_KEY) ?? [],
};

const selectAllRecords = (state: RootState) => state.records.records;

// Мемоизированный селектор для доходов
export const selectIncomeRecords = createSelector(
  [selectAllRecords],
  (records) => records.filter(record => record.type === 'income')
);

// Мемоизированный селектор для расходов
export const selectExpenseRecords = createSelector(
  [selectAllRecords],
  (records) => records.filter(record => record.type === 'expense')
);

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    addRecord(state, action: PayloadAction<{ type: 'income' | 'expense'; amount: number; category: string }>) {
      const record = {
        id: crypto.randomUUID(),
        ...action.payload,
        date: new Date().toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      };
      state.records.push(record);
      saveToLocalStorage(STORAGE_KEY, state.records);
    },
    deleteRecord(state, action: PayloadAction<string>) {
      const recordToDelete = state.records.find(record => record.id === action.payload);
      if (recordToDelete) {
        state.records = state.records.filter(record => record.id !== action.payload);
        saveToLocalStorage(STORAGE_KEY, state.records);
      }
    },
  },
});

export const { addRecord, deleteRecord } = recordsSlice.actions;
export default recordsSlice.reducer;
