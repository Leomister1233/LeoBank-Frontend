import React, { useState, useEffect, useCallback } from 'react'
import {Navbar} from "../Navbar";
import Dropdown from 'react-bootstrap/Dropdown'
import SecureLs from 'secure-ls';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import validation from './LoansValidations';
import { ENCRYPTION_KEY } from '../../config';


export  const Loans = () => {
  const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret:ENCRYPTION_KEY});
  const key=ls.get('Usermaster');
  const [loans,setloans]=useState('');
  const [active,setactive]=useState(false);
  const [errors,setErrors]=useState({});
  const [values, setValues]=useState({
      borrower_id:"",
      user_id:"",
      account_id:"",
      full_name:"",
      loan_amount:"",
      loan_type:"",
      loan_paymenttype:"",
      loan_interest:"",
      loan_reason:"",
      payments:"",
    });
  const [ischecked,setIschecked]=useState(false);
  const [options,setOptions]=useState([]);
  const options1=['Personal','Business','Student'];
  const options3=['Monthly','Quarterly','Annual'];
  const [selectedOption,setSelectedOption]=useState('Please select a Account');
  const [selectedOption1,setSelectedOption1]=useState('Please select the loan type');
  const [selectedOption3,setSelectedOption3]=useState('Please select the payment type');
  const [selectedOption4,setSelectedOption4]=useState(' Please select the loan duration years');
  const options4=['5','10','15','20','25','30'];
  const onOptionChangeHandler2 = (selectedOption) => {
    setValues({ ...values, account_id: selectedOption});
    console.log("User Selected Value - ", selectedOption);
    setSelectedOption(selectedOption);
  };

  const onOptionsChangeHandler= (selectedOption1) =>{
    setValues({...values, loan_type: selectedOption1});
    console.log("User Selected Value - ", selectedOption1);
    setSelectedOption1(selectedOption1)
    setIschecked(true);
    console.log(ischecked);    
  }

  const onOptionsChangeHandler3= (selectedOption3) =>{
    setValues({...values, loan_paymenttype: selectedOption3});
    console.log("User Selected Value - ", selectedOption3);
    setSelectedOption3(selectedOption3)
  }

  const onOptionsChangeHandler4= (selectedOption4) =>{
    setValues({...values, loan_term: selectedOption4});
    console.log("User Selected Value - ", selectedOption4);
    setSelectedOption4(selectedOption4)
  }
  const fetchAccounts = useCallback(async()=>{
    values.user_id = key;
    const checkResponse= await axios.post("https://localhost:8801/checkaccounts",values)
    const encodedUser_id = encodeURIComponent(key);
    if(checkResponse.data.message==="Account found"){
        fetch(`https://localhost:8801/api/getaccountsid?user_id=${encodedUser_id}`)
        .then(response => {
          if(!response.ok){
            console.log('Network response was not ok');
          }
        return response.json();
    })
    .then(data=>{
      console.log('Data received' ,data);
      setOptions(data);
    })
    .catch(error => {
      console.error("Error fetching data", error);
    })
    }else{
      alert("No accounts were found, Please create a new account ")
    } 
    try{
      const loansResponse = await fetch(`https://localhost:8801/api/loansbyuser?user_id=${encodedUser_id}`); 
      const loansData = await loansResponse.json();
      console.log('Values Received', loansData);
      if (!loansResponse.ok) {
          throw new Error('Network response was not ok2');
      }
      setloans(loansData);
      }catch(error){
        console.log("Error ")
      }
          
    },[key,values,setOptions,setloans])
  useEffect(()=>{
      fetchAccounts();
      
  },[fetchAccounts])

  const columns = [
    {
        name:"Loan ID",
        selector:row=>row.loan_id,
        sortable:true
    },
    {
        name:"Name of Borrower",
        selector:row=>row.full_name,
        sortable:true
    },
    {
        name:"Account Id",
        selector:row=>row.account_id,
        sortable:true
    },
    {
        name:"Loaned Amount",
        selector:row=>row.borrow_amount,
        sortable:true
    },
    {
        name:"Amount payed",
        selector:row=>row.amount_payed,
        sortable:true
    },
    {
        name:"Loan Type",
        selector:row=>row.loan_type,
        sortable:true
    },
    {
        name:"Type of Payments",
        selector:row=>row.typeofpayments,
        sortable:true
    },
    {
        name:"Amount to be payed (per selected period)",
        selector:row=>row.preset_amount,
        sortable:true
    },
    {
        name:"Interest Rate",
        selector:row=>row.interest_rate,
        sortable:true
    },
    {
        name:"Loan Term",
        selector:row=>row.loan_term,
        sortable:true
    },
    {
        name:"Loan Reasons",
        selector:row=>row.loan_reasons,
        sortable:true
    },
    {
        name:"Start Date",
        selector:row=>row.start_date,
        sortable:true
    },
    {
        name:"Status",
        selector:row=>row.status,
        sortable:true
    },
    {
        cell:(row)=>row.status=== "Active" ? null :(<Button color="primary" onClick={(e)=>handleButtonDelete(row,e)}>Reject</Button>)
    }
  ]

  const handleButtonDelete = async (row,e)=>{
    e.preventDefault();
    console.log(row.loan_id);
    values.loan_id=row.loan_id;
    try{
      const approveResponse = await axios.post("https://localhost:8801/deleteloan",values)
      if(approveResponse.data.message==="Deletion Successful"){
        alert("Deletion Successful")
      }
    }catch(err){
      console.log("Error",err)
    }
  }

  const handleInput=(e)=>{
     setValues(prev=>({
      ...prev,[e.target.name]:e.target.value
     }));
  }

  const handlesubmit = async(e)=>{
    e.preventDefault();
    setErrors(validation(values));
    console.log(errors)
    if(errors.full_name==="" && errors.loan_amount==="" && errors.account_id==="" && errors.loan_reason===""){
      alert('1');
      if(values.loan_type==='Personal'){
        values.loan_interest='6.5'
      }
      else if(values.loan_type==='Business'){
        values.loan_interest='4.5'
      }else if(values.loan_type==='Student'){
        values.loan_interest='3.0'
      }
   
      values.user_id=key;
      console.log("values 1:",values)
      const borrowerResponse= axios.post('https://localhost:8801/borrower',values)
      setactive(true)
    }
  }
  
  const handleloanConfirmation = async(e)=>{
    e.preventDefault();
    setErrors(validation(values));
    if(errors.loan_term===""){
      const encodedUser_id = encodeURIComponent(key);
      const encodeAccount_id = encodeURIComponent(values.account_id);
      const encodedloan_type = encodeURIComponent(values.loan_type);
      const getBorrowerResponse = await fetch(`https://localhost:8801/api/borrower?user_id=${encodedUser_id}&account_id=${encodeAccount_id}&loan_type=${encodedloan_type}`);
      if(!getBorrowerResponse.ok){
        throw new Error('Error fetching borrower information')
      }
      const borrowerData = await getBorrowerResponse.json();
      values.borrower_id=borrowerData[0].borrower_id;
      console.log(values.borrower_id)
      console.log("Borrow_id",borrowerData);
      const amount=parseFloat(values.loan_amount);
      console.log(amount);
      const loan_term=parseFloat(values.loan_term);
      console.log(loan_term) 
      const interest=parseFloat(values.loan_interest);
      console.log(interest)
      if(values.loan_paymenttype==='Monthly'){
        const interest1=interest/100/12;
        const loan_term1= loan_term*12;
        const numerator= amount*interest1*Math.pow(1+interest1,loan_term1);
        const denominator=Math.pow(1+interest1,loan_term1)-1
        values.payments=(numerator/denominator).toFixed(2);
        alert(values.payments,numerator,denominator)
      }
      if(values.loan_paymenttype==='Quarterly'){
        const interest1=Math.pow(1+interest/100/4,4)-1
        const loan_term1= loan_term*4;
        const numerator= amount*interest1*Math.pow(1+interest1,loan_term1);
        const denominator=Math.pow(1+interest1,loan_term1)-1
        values.payments=(numerator/denominator).toFixed(2);
      }
      if(values.loan_paymenttype==='Annual'){
        const interest1=Math.pow(1+interest/100,loan_term)-1
        const numerator= amount*interest1*Math.pow(1+interest1,loan_term);
        const denominator=Math.pow(1+interest1,loan_term)-1
        values.payments=(numerator/denominator).toFixed(2);
      }
      try{
        console.log("values 2:",values)
        const loansResponse= await axios.post('https://localhost:8801/loans',values)
        console.log("Values 2 ",loansResponse)
        alert('Application sent')
        window.location.reload();
      }catch(err){
        console.log("ERROR",err)
      }
    }
  }

  return (
    <div className='backbody'>
        <Navbar/>
        <div>
            <div >
              <div>
                <h2 data-testid="loans-title">Loans</h2>
              </div>
                  <form>
                    { active===false && (
                      <div>
                        <div>
                          <input placeholder='Full_Name' name='full_name' id='full_name' onChange={handleInput} />
                          {errors.full_name &&<span className='text-danger'>{errors.full_name}</span>}
                        </div>
                        <div>
                          <Dropdown onSelect={onOptionChangeHandler2} id='account_id' name='account_id'>
                          <Dropdown.Toggle variant='success' id='dropdown-secondary'>
                            {selectedOption}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {options.map((option, index) => (
                              <Dropdown.Item key={index} eventKey={option.account_id}>{option.account_id}</Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                          </Dropdown>
                          {errors.account_id &&<span className='text-danger'>{errors.account_id}</span>}
                        </div>
                        <div>
                          <input placeholder='Loan Amount' id='loan_amount' name='loan_amount' onChange={handleInput}/>
                          {errors.loan_amount &&<span className='text-danger'>{errors.loan_amount}</span>}
                        </div>
                        <div>
                          <Dropdown onSelect={onOptionsChangeHandler} id="loan_type" name="loan_type">
                            <Dropdown.Toggle>
                              {selectedOption1}
                            </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {options1.map((option,index)=>{
                                  return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item> 
                                })}
                              </Dropdown.Menu>
                          </Dropdown>
                          {errors.loan_type &&<span className='text-danger'>{errors.loan_type}</span>}
                        </div>
                        { ischecked===true && selectedOption1==='Personal' && (
                          <div>
                            <label>Interest rate(%): </label>
                            <input value='6.5' id='loan_interest' name='loan_interest' onChange={handleInput}  readOnly/>
                          </div>
                        )}
                        {
                          ischecked && selectedOption1==='Business' && (
                            <div>
                              <label>Interest rate (%):</label>
                              <input value='4.5' id='loan_interest' name='loan_interest' onChange={handleInput} readOnly/>
                            </div>
                          )
                        }
                        { ischecked && selectedOption1==='Student' && (
                          <div>
                            <label>Interest rate(%):</label>
                            <input value='3.0' id='loan_interest' name='loan_interest' onChange={handleInput} readOnly/>
                          </div>
                        )}
                        <div>
                          <textarea placeholder='Reasons for Loan' id='loan_reason' name='loan_reason' onChange={handleInput}>
                          </textarea>
                          {errors.loan_reason &&<span className='text-danger'>{errors.loan_reason}</span>}
                        </div>
                        <div>
                          <button className='btn btn-primary' onClick={handlesubmit}>Next</button>
                        </div>
                      </div>
                    )}
                      
                    { active===true && (
                      <div>
                        <div>
                          <Dropdown onSelect={onOptionsChangeHandler3} id="loan_paymenttype" name="loan_paymenttype">
                          <Dropdown.Toggle>
                            {selectedOption3}
                            </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {options3.map((option,index)=>{
                                  return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item> 
                                })}
                              </Dropdown.Menu>
                            </Dropdown>
                            {errors.loan_paymenttype &&<span className='text-danger'>{errors.loan_paymenttype}</span>}
                          </div>
                        <div>
                          <Dropdown onSelect={onOptionsChangeHandler4} id="loan_term" name="loan_term">
                          <Dropdown.Toggle>
                              {selectedOption4}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {options4.map((option,index)=>{
                                return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item> 
                              })}
                            </Dropdown.Menu>
                          </Dropdown>   
                          {errors.loan_term &&<span className='text-danger'>{errors.loan_term}</span>}
                        </div>
                        <div>
                          <button className='btn btn-primary' onClick={handleloanConfirmation}>Confirm loan application</button>
                        </div>
                      </div>
                    )}
                </form>
                <div className='info-container'>
                  <DataTable
                    title="Loan History"
                    columns={columns}
                    data={loans}
                  pagination
                  />
              </div>
            </div>
        </div>
    </div>
  )
}
