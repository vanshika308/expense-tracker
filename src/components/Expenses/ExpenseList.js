import React, { useContext, useState } from 'react';
import ExpenseContext from '../../store/ExpenseContext';
import './ExpenseList.css'; 

const ExpenseList = () => {
  const expenseContext = useContext(ExpenseContext);
  const [editedExpense, setEditedExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const editHandler = (expense) => {
    setEditedExpense({ ...expense });
    setIsEditing(true);
  };

  const saveHandler = () => {
    expenseContext.editExpense(editedExpense);
    setIsEditing(false);
    setEditedExpense(null);
  };

  const cancelHandler = () => {
    setIsEditing(false);
    setEditedExpense(null);
  };

  return (
    <div className='expense-list'>
      <h2 className='expense-list-title'>Expense List</h2>
      {expenseContext.expenses.map((expense, index) => (
        <div className='expense-item' key={index}>
          {isEditing && editedExpense.id === expense.id ? (
            <div className='expense-edit'>
              <input
                type='number'
                value={editedExpense.amount}
                onChange={(e) => setEditedExpense({ ...editedExpense, amount: parseInt(e.target.value) })}
                className='expense-input'
              />
              <input
                type='text'
                value={editedExpense.description}
                onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                className='expense-input'
              />
              <input
                type='text'
                value={editedExpense.category}
                onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
                className='expense-input'
              />
              <button onClick={saveHandler} className='expense-button save-button'>
                Save
              </button>
              <button onClick={cancelHandler} className='expense-button cancel-button'>
                Cancel
              </button>
            </div>
          ) : (
            <div className='expense-details'>
              <span className='expense-amount'>{expense.amount}</span>
              <span className='expense-description'>{expense.description}</span>
              <span className='expense-category'>{expense.category}</span>
            </div>
          )}
          <div className='buttons'>
            {!isEditing ? (
              <button className='expense-button edit-button' onClick={() => editHandler(expense)}>
                Edit
              </button>
            ) : null}
            <button className='expense-button delete-button' onClick={() => expenseContext.deleteExpense(expense.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
