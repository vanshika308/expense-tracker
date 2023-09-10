import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    addItem(state, action) {
        state.expenses = [...state.expenses, action.payload];
    },
    deleteItem(state, action) {
        state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
    },
    setExpenses(state, action) {
        state.expenses = action.payload;
    },
      updateItem(state, action) {
        const index = state.expenses.findIndex((expense) => expense.id === action.payload.id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }

      },
  },
});

export const expenseActions = expensesSlice.actions;

const expenseReducer = expensesSlice.reducer;

export default expenseReducer;
