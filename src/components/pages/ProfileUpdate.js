import { useContext, useRef ,useState} from "react"
import AuthContext from "../../store/AuthContext";
import './Styles/ProfileUpdate.css';

const ProfileUpdate =()=>{

    const authcntxt = useContext(AuthContext);

    const nameInputRef=useRef();
    const photoUrlRef = useRef();
    const [error, setError] = useState(null);


    const submitHandler=(event)=>{

        event.preventDefault();
        const updatedName = nameInputRef.current.value;
        const updatedPhotoUrl = photoUrlRef.current.value;
    
        const requestBody = {
          idToken: authcntxt.token,
          displayName: updatedName,
          photoUrl: updatedPhotoUrl,
          returnSecureToken: true,
        };
    
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        }).then((response) => {
            if (response.ok) {
              console.log('Profile updated successfully');
              response.json().then(data => {
                console.log(data);
              });
            } else {
                setError('Error updating profile');
            }
          })
          .catch((error) => {
            setError('Error: ' + error.message);
        });
    }
   return(
    <div className="container">
      <div className="form-container">
        <h1>Contact Details</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" ref={nameInputRef} />
          </div>
          <div className="form-group">
            <label>Profile Url:</label>
            <input type="text" ref={photoUrlRef} />
          </div>
          <div className="button-container">
            <button type="submit">Update</button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
   )
}

export default ProfileUpdate;