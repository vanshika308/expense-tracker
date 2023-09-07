import { useState, useContext } from 'react';
import './Styles/HomePage.css';
import ExpenseList from '../Expenses/ExpenseList';
import ExpenseContext from '../../store/ExpenseContext';

const HomePage = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');


  const expensecntxt = useContext(ExpenseContext);

  const amountChangeHandler = (event) => {
    setAmount(parseInt(event.target.value));
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addExpenseHandler = (event) => {
    event.preventDefault();
    expensecntxt.addExpense({
      amount: amount,
      description: description,
      category: selectedCategory,
    });
    setAmount('');
    setDescription('');
    setSelectedCategory('Food');
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
           <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Rent">Rent</option>
          <option value="Grocery">Grocery</option>
          <option value="Hygiene">Hygiene</option>
        </select>

        </div>
        <button type="submit" className="submit-button">
          Add Transaction
        </button>
      </div>
    </form>
    <div className="expense-list-container">
    <ExpenseList expenses={expensecntxt.expenses}/>
     </div>
    </>
  );
};

export default HomePage;
