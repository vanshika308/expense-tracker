import { useContext,useState,useEffect } from "react";
import ExpenseContext from "./ExpenseContext";
import AuthContext from "./AuthContext";

const ExpenseProvider=(props)=>{

    const authcntxt = useContext(AuthContext);
    const modifiedEmail = authcntxt.email.replace(/[@.]/g, '');


    const [expenses, setExpenses] = useState([]);

    const addExpenseHandler = (newExpense) => {
      fetch(`https://expense-tracker-233c3-default-rtdb.firebaseio.com/expenses/${modifiedEmail}.json`, {
        method: 'POST',
        body: JSON.stringify({ ...newExpense }),
        headers: { 'Content-Type': 'application/JSON' }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setExpenses((prevExpenses) => [...prevExpenses, { id: data.name, ...newExpense }]);
        })
        .catch((error) => {
          console.error('Error adding expense:', error);
        });
    };

      useEffect(() => {
        fetch(`https://expense-tracker-233c3-default-rtdb.firebaseio.com/expenses/${modifiedEmail}.json`, {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log(response); 
            return response.json();
          })
          .then((data) => {
    
            if (data) {
              const expensesArray = Object.keys(data).map((expenseId) => ({
                id: expenseId,
                ...data[expenseId],
              }));
              setExpenses(expensesArray);
              console.log(expensesArray)
            }
          })
          .catch((error) => {
            console.error('Error retrieving expenses:', error);
          });
      },[]);


      const deleteExpenseHandler = (expenseId) => {
        fetch(`https://expense-tracker-233c3-default-rtdb.firebaseio.com/expenses/${modifiedEmail}/${expenseId}.json`, {
          method: 'DELETE'
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log(response);
      
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
          })
          .catch((error) => {
            console.error('Error deleting expense:', error);
          });
      };
      

      const editExpenseHandler = (editedExpense) => {
        console.log('edit handler called');
      
        fetch(`https://expense-tracker-233c3-default-rtdb.firebaseio.com/expenses/${modifiedEmail}/${editedExpense.id}.json`, {
          method: 'PUT',
          body: JSON.stringify({ ...editedExpense }),
          headers: { 'Content-Type': 'application/JSON' }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setExpenses((prevExpenses) =>
              prevExpenses.map((expense) => (expense.id === editedExpense.id ? editedExpense : expense))
            );
            console.log('Expense data after editing:', data);
          })
          .catch((error) => {
            console.error('Error editing expense:', error);
          });
      };
      


    const expenseContextValue={
        expenses: expenses,
        addExpense: addExpenseHandler,
        editExpense: editExpenseHandler,
        deleteExpense: deleteExpenseHandler
    }

    return (
        <ExpenseContext.Provider value={expenseContextValue}>
            {console.log(expenses)}
          {props.children}
        </ExpenseContext.Provider>
    )
};

export default ExpenseProvider;