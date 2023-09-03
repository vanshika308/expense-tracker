import { useState, useEffect } from 'react';
import './Styles/HomePage.css';
import ExpenseList from '../Expenses/ExpenseList';

const HomePage = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  const amountChangeHandler = (event) => {
    setAmount(parseInt(event.target.value));
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  const addExpenseHandler = (event) => {
    event.preventDefault();
    const newExpense = {
      amount: amount,
      description: description,
      category: selectedCategory,
    };
    setExpenses([...expenses, newExpense]);
    console.log(expenses);
    setAmount('');
    setDescription('');
    setSelectedCategory('');
  };

  return (
    <>
    <form onSubmit={addExpenseHandler}>
      <div className="container">
        <h1 className="page-title">
          <b>Welcome to the Expense-Tracker App</b>
        </h1>
        <div className="form-group">
          <label htmlFor="amount" className="input-label">
            Amount:
          </label>
          <input
            type="number"
            className="input-field"
            placeholder="Enter amount"
            value={amount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="input-label">
            Description:
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter description"
            value={description}
            onChange={descriptionChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropdown" className="input-label">
            Category
          </label>
          <select
            name="dropdown"
            className="dropdown"
            value={selectedCategory}
            onChange={categoryChangeHandler}
          >
            <option>Food</option>
            <option>Petrol</option>
            <option>Salary</option>
            <option>Rent</option>
            <option>Grocery</option>
            <option>Hygiene</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Add Transaction
        </button>
      </div>
    </form>
    <div className="expense-list-container">
        <ExpenseList expenses={expenses} />
     </div>
    </>
  );
};

export default HomePage;
