import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import {Navbar1} from "../Navbar1"; 

export const Payments = () => {
  const [selectedOption, setSelectedOption] = useState("Please choose a transaction");
  const options = ["Payment", "Send Money", "Deposit","Withdrawal"];
  const [values,setValues]=useState({
    account_id:"",
    transaction_type:"Please choose a transaction",
    amount:"",
    descriptions:""
  });
  const onOptionChangeHandler = (selectedOption) => {
    setValues({ ...values, transaction_type: selectedOption });
    console.log("User Selected Value - ", selectedOption);
    setSelectedOption(selectedOption);
  };
  const handleInput = (e)=>{
    setValues(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response =  axios.post("https://localhost:8801/payments", values);
      console.log("Transaction successful:", response.data);
      // Reset form fields if needed
      setValues({
        account_id: "",
        transaction_type: "Please choose me",
        amount: "",
        description: ""
      });
      } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  }
  return (
    <div >
        <Navbar1/>
      <div className='w-50 bg-white rounded p-3'>
        <form action="" >
            <h2>Make a Payment</h2>
            <div className="form-group mt-3"> 
                <input type="text" placeholder='Account Id' value="account_id" name="account_id" onChange={handleInput} />
            </div>
            <div className="form-group mt-3">
                <Dropdown onSelect={onOptionChangeHandler}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedOption}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {options.map((option, index) => {
                            return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>;
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="form-group mt-3">
                <input type="text" placeholder='Amount' value="amount" name="amount"></input>
            </div>
            <div className="form-group mt-3">
                <input type="text" placeholder='Description' value="description" name="description"></input>
            </div>
            <div className='btn btn-primary' onClick={handleSubmit}>Confirm Transaction</div>
        </form>
      </div>
    </div>
  );

};
