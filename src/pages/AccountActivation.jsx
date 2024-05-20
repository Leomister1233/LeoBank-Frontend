import React, { useEffect,useState} from 'react'
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';


export const AccountActivation = () => {
    const location= useLocation();
    const searchParams = new URLSearchParams(location.search); 
    const token  = searchParams.get('token'); // Extract the token parameter from the route
    const navigate=useNavigate();
    const [message,setmessage]=useState('');

    const [values,setValues]=useState({
        user_id:'',
        username:'',
        email:''
    })
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

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const fetchinfo= await axios.get(`https://localhost:8801/api/getinfouser?token=${token}`)
            values.username = fetchinfo.data.userName;
            values.email = fetchinfo.data.email;
            console.log(values.username)
            const fetchuserId= await axios.get(`https://localhost:8801/api/getuserIDbyName?username=${values.username}&email=${values.email}`)
            values.user_id=fetchuserId.data[0].user_id;
            console.log(fetchuserId.data[0].user_id)
            console.log(values.user_id)
            const createprofile= await axios.post("https://localhost:8801/createprofile",values)
            alert('Registered Successfully')
            navigate('/')
        }catch(err){
            console.error("Error fetching username",err);
        }
    }
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
                                        <button onClick={handleSubmit}>Go to Login Page</button>
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
