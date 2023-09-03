
import { useRef } from 'react';
import './Styles/ForgotPassword.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ForgotPassword=()=>{

   const inputEmailRef= useRef();

    const submitFormHandler=(event)=>{
        event.preventDefault();
        const enteredEmail = inputEmailRef.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg',{
            method: 'POST',
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: enteredEmail
            }),
            headers: {
                "Content-Type" : 'application/json',
            }
        }).then((response) => {
            if (response.ok) {
               alert('Password reset email sent.');
            } else {
               console.error('Error sending password reset email.');
            }
         })
         .catch((error) => {
            console.error('Error:', error);
         });
    };

    return(
        <div>
        <div className='container'>
            <div className='signContainer'>Forgot Password</div>
            <form className='formContainer' onSubmit={submitFormHandler}>
                <input className='inputContainer' type='email'
                 name='email'
                  placeholder='Enter Email'
                  required ref={inputEmailRef}/><br/>
                <button className='buttonContainer'>Reset Password</button>
            </form>
            
        </div>
        <Link to='/'>Return to Login Page</Link>
        </div>
    );

};

export default ForgotPassword;