import React,{ useState} from "react";
import axios from 'axios';
import './pagestyle.css';
import { Link, useNavigate } from "react-router-dom";
import validation from "./LoginValidation";
import Background from "./Background.jpg";
import SecureLs from 'secure-ls';
import { ENCRYPTION_KEY } from "../config";

function Login(){
    const [values,setValues]=useState({
        userId:'',
        username:'',
        password:'',
        pin:''
    });
    const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret:ENCRYPTION_KEY});
    const navigate = useNavigate();
    const [verified,setVerified]= useState(false);
    const [errors,setErrors] = useState({})
    const [role,setRole]=useState();
    const handleInput = (e)=>{
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setErrors(validation(values));
        if (errors.username === "" & errors.password === "") {
           const loginresponse =await axios.post('https://localhost:8801/login', values)
           console.log(loginresponse)
           const loginValidation = await axios.post("https://localhost:8801/loginconfirmation",values)
            if(loginresponse.data==="Success" && loginValidation.data.message==="Account validated"){
                
                try{
                    const  response = await axios.get("https://localhost:8801/api/checkidrole",
                    {params:values})
                   
                    const data =await response.data;
                    console.log("Data received from fetch:",data);

                    if(data && data.length > 0){ 
                        
                        const userId=data[0].user_id;
                        values.userId=data[0].user_id;
                        const userRole=data[0].role;
                        setRole(data[0].role);
                        ls.set('Usermaster',userId);
                        //alert(userId)
                       
                        const profileresponse = await axios.post("https://localhost:8801/profilelogincheck",values) 
                        console.log('wqerwet',profileresponse.data);
                        alert('Login successful')
                        
                        if(profileresponse.data.message==='Activated'){
                            setVerified(true); 
                        }else if(profileresponse.data.message==='Not Activated'){
                            if(userRole==="Admin"){
                                navigate('/home',{ state: { username: values.username , password: values.password } });
                            }else{
                                navigate('/homeusers',{ state: { username: values.username , password: values.password } });
                            }
                        } 
                    }
                    else{
                        throw new Error("User Data not o found")
                    }
                }
                catch(err){
                    console.log("An error occurred");
                    alert('An error occurred')
                }
            }else{
                alert('Error , Username or Password are incorrect')
            }
        }
    }

    const handleconfirm = async (e)=>{
        e.preventDefault();
        setErrors(validation(values));
        try{
            const responsePin = await axios.post('https://localhost:8801/pincheck',values)
            console.log("12123",responsePin)
            if(responsePin.status === 200){
                if(role === "Admin"){
                    navigate('/home',{ state: { username: values.username , password: values.password } });
                }else{
                    navigate('/homeusers',{ state: { username: values.username , password: values.password } });
                }
            }
        }catch(err){
            console.error(err);
        }
    }
    
    return(
        <div className="body" style={{backgroundImage : `url(${Background})`}}>
            { !verified && (
                <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className=" cold-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                     <form onSubmit={handleSubmit} >
                                        <div>
                                          <h3>Login</h3>
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="username"> <strong>Name:</strong> </label>
                                            <input onChange={handleInput} name='username' placeholder='UserName' id='username' className="form-control mt-1"/>
                                            {errors.username &&<span className='text-danger'>{errors.username}</span>}
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor='password'> <strong>Password:</strong> </label>
                                            <input onChange={handleInput} name='password' id='password' type='password' placeholder='******' className="form-control mt-1"/>
                                            {errors.password &&<span className='text-danger'>{errors.password}</span>}
                                        </div>
                                        <button type="submit" className="btn btn-primary"  id="loginBtn">Login</button>

                                        <div className="d-grid gap-2 mt-3">
                                            <button> 
                                                <Link to="/register">
                                                    Don't have an account yet? Register here!
                                                </Link>
                                            </button>
                                        </div>
                                        <div className="d-grid gap-2 mt-3">
                                            <button> 
                                                <Link to="/passwordrecovery">
                                                    Forgot Password?
                                                </Link>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                          </div>     
                        </div>
                    </div>
                </div>
            </div>
            )}
            { verified && (
                <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className=" cold-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                     <form  >
                                        <div>
                                          <h3>Login</h3>
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="pin"> <strong>PIN:</strong> </label>
                                            <input onChange={handleInput} name='pin' placeholder='pin' id='pin' className="form-control mt-1"/>
                                            {errors.username &&<span className='text-danger'>{errors.username}</span>}
                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={handleconfirm}>Login</button>

                                        <div className="d-grid gap-2 mt-3">
                                            <button> 
                                                <Link to="/register">
                                                    Don't have an account yet? Register here!
                                                </Link>
                                            </button>
                                        </div>
                                        <div className="d-grid gap-2 mt-3">
                                            <button> 
                                                <Link to="/passwordrecovery">
                                                    Forgot Password?
                                                </Link>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                          </div>     
                        </div>
                    </div>
                </div>
            </div>
            )}
            
        </div>
    ) 
}
export default Login