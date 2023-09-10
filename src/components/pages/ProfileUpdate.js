import { useRef,useEffect ,useState} from "react"
import './Styles/ProfileUpdate.css';
import { useSelector } from "react-redux";

const ProfileUpdate =()=>{

  const authenticationToken = useSelector((state) => state.auth.token);


    const nameInputRef=useRef();
    const photoUrlRef = useRef();
    const [error, setError] = useState(null);

    const [fullName,setFullName]=useState('');
    const [photoUrl,setPhotoUrl]=useState('')

  

    const fetchUserProfile=()=>{
        const requestBody = {
            idToken: authenticationToken,
          };
          console.log(authenticationToken)

      
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

    useEffect(() => {
      if (authenticationToken) {
        fetchUserProfile();
      }
    }, []);
    


    const submitHandler=(event)=>{

        event.preventDefault();
        const updatedName = nameInputRef.current.value;
        const updatedPhotoUrl = photoUrlRef.current.value;
    
        const requestBody = {
          idToken: authenticationToken,
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