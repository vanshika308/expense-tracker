import React from "react";

const ExpenseContext = React.createContext({
    expenses: {},
    addExpense:(expense)=>{},
    editExpense:(expense)=>{},
    deleteExpense:(expense)=>{},
})

export default ExpenseContext;