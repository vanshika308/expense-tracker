import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ExpenseList.css';
import { expenseActions } from '../../store/expenses';

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  
  const dispatch = useDispatch();

  const authenticationEmail = useSelector((state) => state.auth.email);
  const modifiedEmail = authenticationEmail?.replace(/[.@]/g, '');

  const [editedExpense, setEditedExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const editExpenseHandler = (editedExpense) => {
    console.log('edit handler called');

    fetch(`https://expense-tracker-233c3-default-rtdb.firebaseio.com/expenses/${modifiedEmail}/${editedExpense.id}.json`, {
      method: 'PUT',
      body: JSON.stringify({ ...editedExpense }),
      headers: { 'Content-Type': 'application/JSON' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(expenseActions.updateItem(editedExpense));
        console.log('Expense data after editing:', data);
      })
      .catch((error) => {
        console.error('Error editing expense:', error);
      });
  };

  const editHandler = (expense) => {
   
    setEditedExpense({ ...expense });
    setIsEditing(true);
  };

  const saveHandler = (expense) => {
    setIsEditing(false);
    editExpenseHandler(expense);
    setEditedExpense(null);
  };

  const cancelHandler = () => {
    setIsEditing(false);
    setEditedExpense(null);
  };

  const deleteHandler = (expenseId) => {
    const url = `https://expense-tracker-233c3-default-rtdb.firebaseio.com/expenses/${modifiedEmail}/${expenseId}.json`;

    fetch(url, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        console.log(response);
        dispatch(expenseActions.deleteItem(expenseId));
      })
      .then(() => {
        console.log(url);
        console.log('Deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
      });
  };

  return (
    <div className='expense-list'>
      <h2 className='expense-list-title'>Expense List</h2>
      {console.log(expenses)}
      {Array.isArray(expenses) && expenses.length > 0 ? (
        expenses.map((expense, index) => (
          <div className='expense-item' key={index}>
            {console.log(expense.id)}
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
                <button onClick={() => saveHandler(editedExpense)} className='expense-button save-button'>
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
              <button
                className='expense-button delete-button'
                onClick={() => deleteHandler(expense.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No expenses to display</p>
      )}
    </div>
  );
};

export default ExpenseList;
