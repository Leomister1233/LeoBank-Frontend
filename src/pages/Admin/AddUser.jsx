import React,{useState} from 'react'
import axios from 'axios'
import validation from "../RegisterValidation"
import {Navbar1} from "../Navbar1"; 
import { useNavigate} from 'react-router-dom'
export const AddUser = () => {
    const [values,setValues]=useState({
        username:'',
        password:'',
        email:'',
        full_name:'',
        date_of_birth:''
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
        if(errors.username==="" && errors.password==="" && errors.email==="" && errors.full_name==="" && errors.date_of_birth===""){ 
            axios.post('https://localhost:8801/users',values)
            .then(res => {
                alert('User added successfully')
                navigate('/users');
            })
            .catch(err => {
                alert('Error')
                console.log("Registration Error",err)});
        }else{
            setErrors(formErrors);
        }
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
         <Navbar1/>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add User</h2>
                <div className="form-group mt-3">
                    <label htmlFor="Username"> <strong>Username:</strong> </label>
                    <input  name='username' onChange={handleInput} placeholder='Username' id='username' className="form-control mt-1"/>
                    {errors.username &&<span className='text-danger'>{errors.username}</span>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor='password'> <strong>Password:</strong> </label>
                    <input name='password' type='password' placeholder='******' onChange={handleInput} className="form-control mt-1"/>
                    {errors.password &&<span className='text-danger'>{errors.password}</span>}
                </div>
                    <div className="form-group mt-3">
                    <label htmlFor='email'><strong>Email:</strong> </label>
                    <input name='email' type='email' placeholder='Email' onChange={handleInput} className="form-control mt-1 input-match-card"/>
                    {errors.email &&<span className='text-danger'>{errors.email}</span>}
                </div>
                    <div className="form-group mt-3">
                    <label htmlFor="Fullname"> <strong>Full Name:</strong> </label>
                    <input name='full_name' onChange={handleInput} placeholder='Full Name' id='full_name' className="form-control mt-1"/>
                    {errors.full_name &&<span className='text-danger'>{errors.full_name}</span>}
                </div>
                    <div className="form-group mt-3">
                    <label htmlFor="Date of Birth"> <strong>Date of Birth:</strong> </label>
                    <input type="date" name='date_of_birth' placeholder='Date of Birth' id='date_of_birth' onChange={handleInput} className="form-control mt-1"/>
                    {errors.date_of_birth &&<span className='text-danger'>{errors.date_of_birth}</span>}
                </div>
                <button className='btn btn-success'>Add New user</button>
            </form>
        </div>
    </div>
  )
}
