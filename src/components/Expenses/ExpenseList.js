
import './ExpenseList.css';
import React from 'react';

const ExpenseList = ({ expenses}) => {
  return (
    <div className='expense-list'>
      <h2>Expense List</h2>
      {expenses.map((expense, index) => (
        <div className='expense-item' key={index}>
          <div className='expense-details'>
            <span className='expense-amount'>{expense.amount}</span>
            <span className='expense-description'>{expense.description}</span>
            <span className='expense-category'>{expense.category}</span>
          </div>
          <button className='delete-button'>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
