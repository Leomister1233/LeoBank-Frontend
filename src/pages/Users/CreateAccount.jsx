import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import '../pagestyle.css';
import {Navbar} from "../Navbar"; 
import validation from "./AccountValidations"
import SecureLs from 'secure-ls';

export const CreateAccount = () => {
  const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret:'themisterkey1234'});
  const key=ls.get('Usermaster');
  const [selectedOption, setSelectedOption]=useState("Please Choose the type of account");
  const [selectedOption1, setSelectedOption1]=useState("Please choose your country");

  const [errors,setErrors] = useState({});
  const options = ["Checking","Savings","Business"]
  const options1 = ["Portugal","Sao Tome and Principe","Cabo Verde","Guine Bissao","Angola"];
  const [values,setValues]=useState({
    user_id:"",
    account_type:"Please Choose Account type",
    full_name:"Client",
    address:"",
    country:"Please Choose your country"
  });   

  const handleInput = (e)=>{
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const onOptionChangeHandler = (selectedOption) => {
    setValues({ ...values, account_type: selectedOption });
    console.log("User Selected Value - ", selectedOption);
    setSelectedOption(selectedOption);
  };

  const onOptionChangeHandler1 = (selectedOption1) => {
    setValues({ ...values, country: selectedOption1 });
    console.log("User Selected Value - ", selectedOption1);
    setSelectedOption1(selectedOption1);
  };

  useEffect(()=>{
    const fetchAccounts= async()=>{
        values.user_id=key;
        const checkResponse = await axios.post("https://localhost:8801/checkaccounts",values)
        if(checkResponse.data.message === "Account not found"){
            alert('No accounts were found , please create an account')
        }
    }
    fetchAccounts();
  })
  const handleSubmit= (e) => {
    e.preventDefault();
    setErrors(validation(values))
    const full_name = values.full_name;
    alert(full_name);
    values.user_id=key;
    if(values.account_type!=="" &&values.address!=="" && values.country!=="" && values.user_id!=="" && values.full_name!==""){
        try{
        axios.post("https://localhost:8801/createaccount",values)
        .then(res=>{
            alert("Account added successfully")
            console.log(values)
            
        })
        }
        catch (error){
            console.error("Error creating account",error);
        }
  
    }
    values.user_id="";
    values.account_type="Please Choose Account type";
    values.full_name="Client";
    values.address="";
    values.country="Please Choose your country";
 } 
    

 return (
    <div >
        <Navbar/>
        <div className='d-flex vh-100  bg-primary justify-content-center align-items-center'>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className=" cold-md-5">
                         <div className='card2'>
                            <form action="">
                                <div>
                                    <h2>Create an account</h2>
                                </div>
                                <div className="form-group mt-3">
                                    <div className="form-group mt-3">
                                        <Dropdown onSelect={onOptionChangeHandler} id='account_type' name='account_type'>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                {selectedOption}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {options.map((option,index)=>{
                                                    return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                                                })}
                                            </Dropdown.Menu>
                                            </Dropdown>
                                            {selectedOption==="Business" && (
                                                <div className="form-group mt-3">
                                                    <input type='text'
                                                    id='full_name'
                                                    name='full_name' placeholder='Company Name'onChange={handleInput}/>
                                                    {errors.full_name &&<span className='text-danger'>{errors.full_name}</span>}
                                                </div>
                                            )}
                                            
                                        </div >
                                        <div className="form-group mt-3">
                                            <input type='text' placeholder='Address' id='address' name='address' onChange={handleInput}/>
                                            {errors.address &&<span className='text-danger'>{errors.address}</span>}
                                        </div>
                                        <div className="form-group mt-3">
                                            <Dropdown onSelect={onOptionChangeHandler1}>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                {selectedOption1}  
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                {options1.map((option,index)=>{
                                                    return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                                                })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {errors.country &&<span className='text-danger'>{errors.country}</span>}
                                        </div>
                                        <div>
                                            <button className='btn btn-primary' onClick={handleSubmit}>Create an account</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}
