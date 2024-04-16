import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import '../pagestyle.css';
import {Navbar} from "../Navbar"; 
import validation from "./TransactionValidations"
import { useNavigate } from 'react-router-dom';
import SecureLs from 'secure-ls';

export const Transaction = () => {
    const [selectedOption, setSelectedOption] = useState("Please choose a transaction");
    const [selectedOption1, setSelectedOption1] = useState("Please select the type of company");
    const [selectedOption2,setSelectedOption2]= useState("Please select an account");
    const navigate=useNavigate();
    const options = ["Payment", "Withdrawal", "Transfer","Deposit"];
    const options2 = ["Utility", "Vendor"];
    const [options3,setOptions3]=useState([])
    const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret:'themisterkey1234'});
  const key=ls.get('Usermaster');
    const [errors,setErrors] = useState({});
    //const [accountNo,setAccountNo] = useState('');
    const [values,setValues]=useState({
        user_id:"",
      transaction_id:"",  
      account_id:"Please select an account",
      transaction_type:"Please choose a transaction",
      recipient_account_id:"",
      amount:"",
      descriptions:"",
      payee_name:"",
      payee_type:""
    });

    const resetForm = () => {
        setValues({
            transaction_id:"",
            account_id: 'Please select an account',
            transaction_type: 'Please choose a transaction',
            recipient_account_id:"",
            amount: "",
            descriptions: "",
            payee_name: "",
            payee_type: ""
        });
    };

    useEffect(()=>{
        const fetchAccounts = async()=>{
            values.user_id = key;
            const checkResponse= await axios.post("https://localhost:8801/checkaccounts",values)
            if(checkResponse.data.message==="Account found"){
                const encodedUser_id = encodeURIComponent(key);
                fetch(`https://localhost:8801/api/getaccountsid?user_id=${encodedUser_id}`)
                .then(response => {
                    if(!response.ok){
                    console.log('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data=>{
                    console.log('Data received' ,data);
                    setOptions3(data);

                })
                .catch(error => {
                    console.error("Error fetching data", error);
                })
            }else{
                alert("No accounts were found, Please create a new account ")
            }
        }
        fetchAccounts()
       
    },[values,key]);

    const onOptionChangeHandler = (selectedOption) => {
      setValues({ ...values, transaction_type: selectedOption });
      console.log("User Selected Value - ", selectedOption);
      setSelectedOption(selectedOption);
    };

    const onOptionChangeHandler1 = (selectedOption1) => {
        setValues({ ...values, payee_type: selectedOption1 });
        console.log("User Selected Value - ", selectedOption1);
        setSelectedOption1(selectedOption1);
    };

    const onOptionChangeHandler2 = (selectedOption2) => {
        setValues({ ...values, account_id: selectedOption2});
        console.log("User Selected Value - ", selectedOption2);
        setSelectedOption2(selectedOption2);
    };

    const handleInput =  (e)=>{
      setValues(prev => ({
          ...prev,
          [e.target.name]: e.target.value
      }));
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors(validation(values))
      if(values.transaction_type === 'Payment' &&errors.account_id==="" && errors.recipient_account_id==="" &errors.amount===""){
        try {
            const response = await axios.post("https://localhost:8801/transaction", values)
            console.log("Transaction saved status:", response.data);
            const sender_account = encodeURIComponent(values.account_id);
            const receiver_account = encodeURIComponent(values.recipient_account_id);
            const fetchresponse = await fetch(`https://localhost:8801/api/payeeinfo?sender_account_id=${sender_account}&recipient_account_id=${receiver_account}`)

            if (!fetchresponse.ok) {
                throw new Error('Error fetching payee information');
            } 
            const data = await fetchresponse.json();
            if (data && data.length > 0) {
                values.transaction_id = data[0].transaction_id;
                console.log("Values pre insertion", values);
                const payeeresponse = await axios.post("https://localhost:8801/payee", values)
                console.log('Data received from', payeeresponse.data);
                alert('Transaction Successful');
                resetForm();
            } 
        }
        catch(error){
            console.error("Error submitting transaction: ", error)
        }
    }
    else if(values.transaction_type === 'Withdrawal'&& errors.account_id==="" &errors.amount==="" ){
        try{
            values.recipient_account_id=values.account_id;
            const response =await axios.post("https://localhost:8801/transaction", values)
            console.log("Transaction successful:", response.data);
            const responsetransfer = await axios.post("https://localhost:8801/transfer",values)
            console.log("Transfer successful:", responsetransfer.data);
            alert("Withdrawal transaction successfully")
            resetForm();
        }
        catch (error) {
            console.error("Error submitting transaction:", error);
        }
    }

    else if(values.transaction_type === 'Deposit' &&errors.account_id==="" &&errors.amount==="" ){
        values.recipient_account_id=values.account_id;
        try {
            const Transactionresponse =  await axios.post("https://localhost:8801/transaction", values)
            console.log("Inputed values", values)
            console.log("Transaction:", Transactionresponse.data);
            const Depositresponse = await axios.post("https://localhost:8801/deposit",values)
            console.log("Inputed values ", values.account_id, values.amount);
            console.log("Account updated successfully:", Depositresponse.data);
            alert("Amount Deposited Successfully ")
                // Reset form fields if needed
            resetForm();
        } 
        catch (error) {
            console.error("Error submitting transaction:", error);
        }
    }

    if(values.transaction_type === 'Transfer'&& errors.account_id==="" && errors.recipient_account_id==="" &errors.amount===""){
        const receive=values.recipient_account_id;
        const send=values.account_id;
        try {
            const transactionResponse = await axios.post("https://localhost:8801/transaction", values)
            console.log("Values content ", values);
            console.log("Transaction successful:", transactionResponse.data);
            values.account_id=receive;
            const depositResponse = await axios.post("https://localhost:8801/deposit",values)
            console.log('Transaction values', values)
            console.log("Deposit successful:", depositResponse.data);
            values.account_id=send;
            const transferResponse = await axios.post("https://localhost:8801/transfer",values)
            console.log("Transfer successful:", transferResponse.data);
            alert("Transfer successful ");
            resetForm();
        } 
        catch (error) {
            console.error("Error submitting transaction:", error);
        }
    }
    //navigate('/transaction')
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
                                    <h2> Make a Transaction
                                    </h2>
                                </div>
                                <div className="form-group mt-3">
                                    <div className="form-group mt-3">
                                        <Dropdown onSelect={onOptionChangeHandler2} id='account_id' name='account_id'>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {selectedOption2}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        {options3.map((option,index) => (
                                            <Dropdown.Item key={index} eventKey={option.account_id}>{option.account_id}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                        </Dropdown>
                                        {errors.account_id &&<span className='text-danger'>{errors.account_id}</span>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <Dropdown onSelect={onOptionChangeHandler} id='transaction_type' name='transaction_type'>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                {selectedOption}
                                            </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {options.map((option,index)=>{
                                                        return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                                                    })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {errors.transaction_type &&<span className='text-danger'>{errors.transaction_type}</span>}
                                            {selectedOption ==="Payment" && (
                                                <div className="form-group mt-3">
                                                    <div className="form-group mt-3">
                                                        <input type="text" placeholder='Name of the company ' id='payee_name' name='payee_name'
                                                        onChange={handleInput}/>
                                                        {errors.payee_name &&<span className='text-danger'>{errors.payee_name}</span>}
                                                    </div>
                                                    
                                                    <div className="form-group mt-3">
                                                        <Dropdown onSelect={onOptionChangeHandler1} id='payee_type' name='payee_type'>
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                {selectedOption1}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                {options2.map((option,index)=>{
                                                                    return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                                                                })}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        {errors.payee_type &&<span className='text-danger'>{errors.payee_type}</span>}
                                                    </div>
                                                </div>
                                            )}
                                            {selectedOption!=="Deposit" && selectedOption!=="Withdrawal" &&(
                                                <div>
                                                   <div className="form-group mt-3">
                                                      <input type='text' placeholder='Recipient Account No' id='recipient_account_id' name='recipient_account_id' onChange={handleInput}/>
                                                      {errors.recipient_account_id &&<span className='text-danger'>{errors.recipient_account_id}</span>}
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                    <div className='form-group mt-3'>
                                        <input type='number' placeholder='Amount' id='amount' name='amount' onChange={handleInput} />
                                        {errors.amount && <span className='text-danger'>{errors.amount}</span>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type='text' placeholder='Transaction Description (Optional)' id='descriptions' name='descriptions' onChange={handleInput}/>
                                    </div>
                                    <div>
                                        <button className='btn btn-primary' onClick={handleSubmit}>Make the transaction </button>
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
