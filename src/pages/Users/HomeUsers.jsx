import React,{useState, useEffect} from 'react';
import {Navbar} from "../Navbar";
import { Link } from "react-router-dom";
import "../Home.css";
import "../Navbar.css";
import verticaldots from "../../images/verticaldots.png";
import Dropdown from 'react-bootstrap/Dropdown'
import axios from "axios"
import DataTable from 'react-data-table-component';
import download from "../../images/download.png";
//
import SecureLs from 'secure-ls';

export const HomeUsers = () => {

  const [isModalOpen, setIsModalOpen]= useState(false);
  const [password,setPassword]= useState('');
  const [balance1,setBalance1]=useState(null);
  const [transactions,setTransactions]=useState();
  const [options,setOptions]=useState([]);
  const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret:'themisterkey1234'});
  const key=ls.get('Usermaster');
  const [selectedOptions,setSelectedOptions]=useState("Please Select from your available Accounts");
  const [verified,setVerified]=useState(false);
  const [values,setValues]=useState({
    user_id:"",
    password:"",
    account_id:"",
    recipient_account_id:"",
    transaction_type:"",
    amount:"",
    payeee_name:"",
    payee_type:"",
  });
 
  const handleInput =  (e)=>{
    setValues(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
  }
  
  useEffect(() => {
    const fetchBalance = async () => {
        try {
          values.user_id = key;
          console.log(key)
         
          const checkResponse= await axios.post("https://localhost:8801/checkaccounts",values)
          if(checkResponse.data.message==="Account found"){
             const encodedUser = encodeURIComponent(key);
             const responseAccounts= await  fetch(`https://localhost:8801/api/getaccountsid?user_id=${encodedUser}`)
            const AccountData= await responseAccounts.json();
            setOptions(AccountData)
            console.log("Account retrieved",AccountData);
            console.log("Options Available", AccountData)
          } else{
            alert("No accounts were found, Please create a new account ")
          }  

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchBalance();
  }, [values,key]); // Empty dependency array to ensure the effect runs only once on component mount

  const openModal =() =>{
    setIsModalOpen(true); // Make
  }

  const closeModal =()=>{
    setIsModalOpen(false);
    setPassword('');
  }

  const handlePasswordConfirm = async (e) => {
    e.preventDefault();
    try{
      values.user_id=key;
      values.password=password;
      console.log(password)
      const response =await axios.post('https://localhost:8801/login1',values)
      if(response.data==="Success"){
        console.log('Password confirmed,proceed with action...');
        setVerified(true)
      }else{
        alert('Incorrect password, please try again.');

      }
    }catch(error){
      console.log('error');
      alert('Error confirming password. Please try again');
    }
    closeModal();
  }
  useEffect(() => {
        if (verified) {
          handleOptionsSelected(selectedOptions);
          closeModal();

        }
      }, [verified, selectedOptions]);

 
  const  handleOptionsSelected = async (selectedOptions)=>{
    setValues({...values,account_id:selectedOptions});
    console.log("User Selected Value ", selectedOptions)
    setSelectedOptions(selectedOptions);
    setIsModalOpen(true)
    console.log("User Selected value 2",selectedOptions)
    if(selectedOptions !=="" && verified===true){
      const encodedUser = encodeURIComponent(selectedOptions);
      console.log("User Selected value 3",encodedUser)
      const balanceResponse = await fetch(`https://localhost:8801/api/showbalance?account_id=${encodedUser}`);

      if (!balanceResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const balanceData = await balanceResponse.json();
      setBalance1(balanceData);

      console.log('Data from balance fetch:', balanceData);
      
      const transactionResponse = await fetch(`https://localhost:8801/api/getUsertransaction?account_id=${encodedUser}`);

      if (!transactionResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const transactionData = await transactionResponse.json();
      setTransactions(transactionData);
      console.log('Data from transaction fetch:', transactionData);
    }
  }

  const columns =[
    {
      name:"transaction_id",
      selector: row=> row.transaction_id,
      sortable: true
    },
    {
      name:"sender_account_id",
      selector: row=> row.sender_account_id,
      sortable: true
    },
    {
      name:"transaction_type",
      selector: row=> row.transaction_type,
      sortable: true
    },
    {
      name:"recipient_account_id",
      selector: row=> row.recipient_account_id,
      sortable: true
    },
    {
        name:"transaction_date",
        selector: row=> row.transaction_date,
        sortable: true
    },
    {
      name:"description",
      selector: row=> row.description,
      sortable: true
    }
  ];

  const [clickedbutton, setClickedButton] = useState(false);

  const handleClick = (buttonName,event) => {
    event.preventDefault();
    setClickedButton(buttonName); 
  }

  const handleTransfer = async (e) => {
    e.preventDefault();
    if(verified){
      try{
        values.transaction_type = "Transfer"
        const transactionResponse = await axios.post("http:localhost:8801/transaction",values);
        console.log("Transaction data ", transactionResponse.data);
        const depositResponse = await axios.post("http:localhost:8801/deposit",values);
        console.log("Deposit data ", depositResponse.data);
        const transferResponse = await axios.post("http:localhost:8801/transfer",values);
        console.log("Transfer data ", transferResponse.data);
      }catch(error){
        console.error("Error submitting transaction",error)
      }
    }
  }

  const handlePayment = async (e) =>{
    e.preventDefault();
  
        try {
        values.transaction_type = "Payment";
        const response = await axios.post("http://localhost:8801/transaction", values)
        console.log("Transaction saved status:", response.data);
        const sender_account = encodeURIComponent(values.account_id);
        const receiver_account = encodeURIComponent(values.recipient_account_id);
        const fetchresponse = await fetch(`http://localhost:8801/api/payeeinfo?sender_account_id=${sender_account}&recipient_account_id=${receiver_account}`)

        if (!fetchresponse.ok) {
            throw new Error('Error fetching payee information');
        } 
        const data = await fetchresponse.json();
        if (data && data.length > 0) {
            values.transaction_id = data[0].transaction_id;
            console.log("Values pre insertion", values);
            const payeeresponse = await axios.post("http://localhost:8801/payee", values)
            console.log('Data received from', payeeresponse.data);
            alert('Transaction Successful');
        } 
      }
      catch(error){
          console.error("Error submitting transaction: ", error)
      }
   
    
  }
  return ( 
      <div className='home-container'>
        <Navbar/>
        <div>
          
          <form action="" >
            <div className='title-head'>
              <h1>Welcome to the Bank of Leo </h1>
            </div>
            <div className='container'>
              <div className='bank-balance'>
              <div className='tag' >
                <h1></h1>
                <img src={verticaldots} alt='new'></img>
              </div>
              <div >
                  <div className='balance-select'>
                    <img src={download} alt='hello'/>
                  </div>
                  <div className='balance-select'>
                    <Dropdown onSelect={handleOptionsSelected} id='account_id' name='account_id'>
                      <Dropdown.Toggle>
                        {selectedOptions}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {options.map((options, index)=>(
                          <Dropdown.Item key={index} eventKey={options.account_id}>
                              {options.account_id}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  </div>
                  { verified &&(
                  <div>
                    <h1>Balance:</h1>
                    <div className='balance-display'>
                      {balance1 !== null && balance1.map((item, index) => (
                        <div key={index}>{item.balance}</div>
                      ))}
                    </div> 
                  </div>
                )}
              </div>
              <div className='send-request'>
                <div>
                  <h2> Quick Transactions</h2>
                </div>
                <div className='tag1'>
                  <button className='btn btn-primary btn-lg' name='transfer' onClick={(e)=>handleClick('transfer',e)}>
                    Quick Transfer
                  </button>
                  <button className='btn btn-primary btn-lg' name='payment' onClick={(e)=>handleClick('payment',e)}>
                    Payment
                  </button>
                </div>
                <div>
                  <div>
                    {clickedbutton==="payment" && verified && (
                      <div>
                        <div className="form-group mt-3">
                          <input type='text' placeholder='Name of the Company' onChange={handleInput}/>
                        </div>
                        <div className="form-group mt-3">
                          <input type='text' placeholder='Type of Company' onChange={handleInput}/>
                        </div>
                        <div className="form-group mt-3">
                          <input type='text' placeholder='Recipients Account' onChange={handleInput}/>
                        </div>
                        <div className="form-group mt-3">
                          <input type='number' placeholder='Amount' onChange={handleInput}/>
                        </div>
                        <div className="form-group mt-3"> 
                          <input type='text' placeholder='Transaction Description (Optional)' onChange={handleInput}/>
                        </div>
                        <div>
                          <button className='btn btn-primary ' onClick={handlePayment}> Complete Payment </button>
                        </div>
                      </div>
                    )}{clickedbutton==="payment" && !verified &&(
                      <div className='balance-select'>Please First Choose an Account!</div>
                    )}
                    {clickedbutton==="transfer" &&verified && (
                      <div className="container mt-5">
                        <div className="form-group mt-3">
                          <input type='text' placeholder='Recipients Account' onChange={handleInput}/>
                        </div>
                        <div className="form-group mt-3">
                          <input type='number' placeholder='Amount' onChange={handleInput} />
                        </div>
                        <div>
                          <button className='btn btn-primary ' onClick={handleTransfer}> Complete Transfer </button>
                        </div>
                      </div>
                    )}
                    {clickedbutton==="transfer" && !verified &&(
                      <div className='balance-select'>Please First Choose an Account!</div>
                    )}
                  </div> 
                  <div className='container mt-5'>
                    <Link to='/transaction'>More Transactions Options</Link>
                  </div>
                </div>
              </div>
            </div>
            
           <div className='recent-activity'>
              <h2>Recent Transaction History</h2>
              <div>
                <DataTable 
                columns={columns}
                data={transactions}
                selectableRows
                fixedHeader
                pagination/>
              </div>
              <div className="form-group mt-3">
                  <Link>More </Link>
                </div>
            </div>
            {isModalOpen && (
              <div className='floating'>
                  <div className='title'>
                      <h2>Password Confirmation</h2>
                  </div>
                  <div className='title-div'>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Insert your User password'/>
                  </div>
                  <div className='title-btn'>
                    <button className='btn btn-primary' onClick={handlePasswordConfirm}> Confirm </button>
                    <button className='btn btn-secondary' onClick={closeModal}> Cancel </button>
                  </div>
              </div>
            )}
          </form>
        </div>
      </div>       
  )
}
