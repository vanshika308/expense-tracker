import { useContext, useRef,useEffect ,useState} from "react"
import AuthContext from "../../store/AuthContext";
import './Styles/ProfileUpdate.css';

const ProfileUpdate =()=>{

    const authcntxt = useContext(AuthContext);

    const nameInputRef=useRef();
    const photoUrlRef = useRef();
    const [error, setError] = useState(null);

    const [fullName,setFullName]=useState('');
    const [photoUrl,setPhotoUrl]=useState('')

    useEffect(() => {
        fetchUserProfile();
      }, [authcntxt.token,authcntxt.email]);

    const fetchUserProfile=()=>{
        const requestBody = {
            idToken: authcntxt.token,
          };
          console.log(authcntxt.token)

      
          fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDuGcgdMdoEb10Z2SKOOb8vttuUJsRYfDg',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            }
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Failed to fetch user profile');
              }
            })
            .then((data) => {
              if (data.users && data.users.length > 0) {
                const user = data.users[0];
                console.log(data)
                setFullName(user.displayName);
                setPhotoUrl(user.photoUrl)
              }
             
            })
            .catch((error) => {
              console.error('Error:', error);
             
            });
    };


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
            <input type="text" ref={nameInputRef} 
            defaultValue={fullName}/>
          </div>
          <div className="form-group">
            <label>Profile Url:</label>
            <input type="text" ref={photoUrlRef} 
            defaultValue={photoUrl}/>
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