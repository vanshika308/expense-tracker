import React, { useContext, useState } from "react";
import AuthContext from '../../store/AuthContext';
import ProfileUpdate from './ProfileUpdate';
import './Styles/ProfilePage.css';

const ProfilePage = () => {
   const [update, setUpdate] = useState(false);
   const [verificationSent, setVerificationSent] = useState(false); 
   const authContext = useContext(AuthContext);

   const handleUpdateClick = () => {
      setUpdate(true);
   };

   const sendVerificationEmail = () => {
      const idToken = authContext.token;

      if (idToken) {
         const requestBody = {
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
         };

         fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg`, 
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(requestBody),
            }
         )
            .then((response) => {
               if (response.ok) {
                  setVerificationSent(true); 
                  console.log("Email verification sent.");
               } else {
                  throw new Error("Error sending email verification.");
               }
            })
            .catch((error) => {
               console.error("Error:", error);
            });
      }
   };

   return (
      <div className="container">
         <h1 className="heading">WELCOME TO EXPENSE TRACKER</h1>
         {!update && (
            <div className="incomplete-profile">
               <p>Your Profile is Incomplete</p>
               <button onClick={handleUpdateClick}>Complete now</button>
            </div>
         )}
         <hr />
         {update && <ProfileUpdate />}
         <hr />
         {!verificationSent && (
            <div className="verification">
               <h5>Verify Your Email</h5>
               <button onClick={sendVerificationEmail}>
                  {verificationSent ? 'Resend Verification' : 'Send Verification'}
               </button>
            </div>
         )}
      </div>
   );
};

export default ProfilePage;
