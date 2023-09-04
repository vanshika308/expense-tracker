import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import './Styles/HomePage.css';
import ExpenseList from '../Expenses/ExpenseList';

const HomePage = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [expenses, setExpenses] = useState([]);

  const authcntxt= useContext(AuthContext);

  const amountChangeHandler = (event) => {
    setAmount(parseInt(event.target.value));
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setSelectedCategory(event.target.value);
  };

  const modifiedEmail = authcntxt.email.replace(/[@.]/g, '');


  useEffect(() => {
    fetch(`https://expense-tracker-233c3-default-rtdb.firebaseio.com/expenses/${modifiedEmail}.json`,{
      method: "GET",  
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        const expensesArray = Object.values(data); 
        setExpenses(expensesArray);
        console.log(expenses)
      }
    })
    .catch((error) => {
      console.error('Error retrieving expenses:', error);
    });
  }, [modifiedEmail,expenses]);

  const addExpenseHandler = (event) => {
    event.preventDefault();
    const newExpense = {
      amount: amount,
      description: description,
      category: selectedCategory,
    };

    fetch(`https://expense-tracker-233c3-default-rtdb.firebaseio.com/expenses/${modifiedEmail}.json`,{
      method:'POST',
      body : JSON.stringify({...newExpense}),
      headers:{'Content-Type':'application/JSON'} 
    })

    setAmount('');
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
        <ExpenseList expenses={expenses} />
     </div>
    </>
  );
};

export default HomePage;
