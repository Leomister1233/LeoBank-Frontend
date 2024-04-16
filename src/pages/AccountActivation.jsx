import React, { useEffect,useState} from 'react'
import axios from 'axios';
import { Link,useLocation } from 'react-router-dom';



export const AccountActivation = () => {
    const location= useLocation();
    const searchParams = new URLSearchParams(location.search); 
    const token  = searchParams.get('token'); // Extract the token parameter from the route
    const [message,setmessage]=useState('');
    useEffect(() => {
        const activateAccount = async () => {
            try {
                console.log("This is token:", token);
                if (token) {
                    const response = await axios.post('https://localhost:8801/activate', { token });
                    alert(response.data.message);
                    setmessage(response.data.message);
                }
            } catch (error) {
                alert('Error activating account. Please try again');
                console.error('Activation error:', error);
            }
        };
        activateAccount();
    }, [token]);

  return (
    <div className='body'>
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='cold-md-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <div>
                                <form>
                                    <div className='form-group mt-3'>
                                        <h2>{message}</h2>
                                    </div>
                                    <div className='form-group mt-3'>
                                        <Link to='/'>Go to Login page</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
