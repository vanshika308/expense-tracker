
import ProfileUpdate from './ProfileUpdate';
import './Styles/ProfilePage.css';
import { useState } from 'react';

const ProfilePage=()=>{

   const[update,setUpdate]=useState(false);

   const handleUpdateClick =()=>{
      setUpdate(true);
   }

   return(
      <div className="container">
      <h1 className="heading">WELCOME TO EXPENSE TRACKER</h1>
      {!update && (
        <div className="incomplete-profile">
          <p>Your Profile is Incomplete</p>
          <button onClick={handleUpdateClick}>Complete now</button>
        </div>
      )}
      {update && <ProfileUpdate />}
      <hr />
    </div>
   );
}

export default ProfilePage;