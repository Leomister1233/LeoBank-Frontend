import React,{useState} from 'react'
import axios from 'axios'
import validation from "../RegisterValidation"
import { useNavigate} from 'react-router-dom'
export const DeleteUser = () => {
    const [values,setValues]=useState({
        username:'',
        email:'',
    });
    const handleInput = (e)=>{
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    const navigate = useNavigate();
    const [errors,setErrors] = useState({})
    const handleSubmit = (e)=>{
        e.preventDefault();
        const formErrors = validation(values);
        setErrors(validation(values));
        //alert(values.date_of_birth)
        if(errors.username==="" && errors.email===""){ 
            axios.post('https://localhost:8801/deleteuser',values)
            .then(res => {
                alert('User deleted successfully')
                navigate('/users');
            })
            .catch(err => {
                alert('Error')
                console.log("Failed to delete user",err)});
        }else{
            setErrors(formErrors);
        }
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Delete User</h2>
                <div className="form-group mt-3">
                    <label htmlFor="Username"> <strong>Username:</strong> </label>
                    <input  name='username' onChange={handleInput} placeholder='Username' id='username' className="form-control mt-1"/>
                    {errors.username &&<span className='text-danger'>{errors.username}</span>}
                    </div>
                <div className="form-group mt-3">
                    <label htmlFor='email'><strong>Email:</strong> </label>
                    <input name='email' type='email' placeholder='Email' onChange={handleInput} className="form-control mt-1 input-match-card"/>
                    {errors.email &&<span className='text-danger'>{errors.email}</span>}
                </div>
                <button className='btn btn-success'>Delete User</button>
            </form>
        </div>
    </div>
  )
}