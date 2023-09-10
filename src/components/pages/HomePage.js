import { useState ,useEffect} from 'react';
import './Styles/HomePage.css';
import ExpenseList from '../Expenses/ExpenseList';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../store/expenses';
import PremiumButton from '../UI/PremiumButton';

const HomePage = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [isLoading, setIsLoading] = useState(false); // Declare isLoading state


  const authenticationEmail = useSelector((state) => state.auth.email);

  const modifiedEmail = authenticationEmail ? authenticationEmail.replace(/[.@]/g, '') : '';



  const amountChangeHandler = (event) => {
    setAmount(parseInt(event.target.value));
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setSelectedCategory(event.target.value);
  };

  const expenses = useSelector((state) => state.expenses.expenses); // Get expenses from Redux store

  const fetchExpenses = () => {
    setIsLoading(true);
    fetch(`https://expense-tracker-233c3-default-rtdb.firebaseio.com/expenses/${modifiedEmail}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({ id: key, ...data[key] });
        }
        dispatch(expenseActions.setExpenses(loadedExpenses));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);



  const addExpenseHandler = (event) => {
    event.preventDefault();
    const newExpense = {
      amount: amount,
      description: description,
      category: selectedCategory,
    };
   

    fetch(`https://expense-tracker-233c3-default-rtdb.firebaseio.com/expenses/${modifiedEmail}.json`, {
      method: 'POST',
      body: JSON.stringify({ ...newExpense }),
      headers: { 'Content-Type': 'application/json' }, // Use lowercase 'json'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {

        console.log(data.name)
        dispatch(expenseActions.addItem( { id: data.name, ...newExpense }));
        console.log('item added successfully')
        setAmount('');
        setDescription('');
        setSelectedCategory('Food');
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
      });
  };

  return (
    <>
    {console.log(authenticationEmail)}
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
      {console.log(totalExpenses)}
      {(totalExpenses>10000) && <PremiumButton/>}
      <div className="expense-list-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ExpenseList expenses={expenses} />
        )}

      </div>
    </>
  );
};

export default HomePage;
