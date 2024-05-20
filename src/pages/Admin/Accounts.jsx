import React, {useEffect,useState} from 'react'
import { Navbar1 } from '../Navbar1';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../GridComponent.css';
import Dropdown from 'react-bootstrap/Dropdown'
import SecureLs from 'secure-ls';
import validation from "./AccountsValidation123"
import { ENCRYPTION_KEY } from '../../config';

export const Accounts = () => {
    const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret: ENCRYPTION_KEY });
    const key=ls.get('Usermaster');
    const [user,setUser]=useState([]);
    const [verified,setVerified]=useState(false);
    const [verified1,setVerified1]=useState(false);
    const [errors,setErrors] = useState({});
    const options = ["Checkings","Savings","Business"]
    const options1 = ["Portugal","Sao Tome and Principe","Cabo Verde","Guine Bissao","Angola"];
    const [selectedOption, setSelectedOption]=useState("Please Choose the type of account");
    const [selectedOption1, setSelectedOption1]=useState("Please choose your country");
    const [values,setValues]=useState({
      user_id:"",
      account_id:"",
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
    useEffect(() => {
    fetch('https://localhost:8801/api/getaccounts')
    .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUser(data);
            setRecords(data); // Set records with initial data
        })
        .catch(error => console.error('Error fetching users:', error));
        },[])   

    const columns =[
        {
          name:"account_id",
          selector: row=> row.account_id,
          sortable: true
        },
        {
          name:"user_id",
          selector: row=> row.user_id,
          sortable: true
        },
        {
          name:"account_type",
          selector: row=> row.account_type,
          sortable: true
        },
        {
          name:"balance",
          selector: row=> row.balance,
          sortable: true
        },
        {
            name:"created_at",
            selector: row=> row.created_at,
            sortable: true
        },
    ];
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
    const navigate= useNavigate()
    const [records,setRecords] = useState(user);
    function handlefilter(e) {
      const accountId = parseInt(e.target.value);
      const newUser = user.filter(row => {
          return row.account_id === accountId;
      });
      if(e.target.value !==""){
        setRecords(newUser);
      }else{
        setRecords(user)
      } 
    }
    
    const handleAdd = (e) =>{
        e.preventDefault();
        setVerified(true);
        setVerified1(false)
    }
    
    const handleDelete = (e) =>{
        e.preventDefault();
        setVerified(false);
        setVerified1(true);
    }

    const handleSubmit= (e) => {
      e.preventDefault();
      setErrors(validation(values))
      console.log(key)
      values.user_id=key;
      if(values.account_type!=="" &&values.address!=="" && values.country!=="" && values.user_id!=="" && values.full_name!==""){
          try{
          axios.post("https://localhost:8801/createaccount",values)
          .then(res=>{
              alert("Account added successfully")
              console.log(values)
               window.location.reload();
          })
          }
          catch (error){
              console.error("Error creating account",error);
          }
    
      }
    }  
    
    const handleDeleteaccount = async (e) =>{
      e.preventDefault();
      setErrors(validation(values))
      try{
        if(values.account_id !==""){
          const Deleteresponse = await axios.post("https://localhost:8801/deleteaccount",values)
          if(Deleteresponse.status === 200){
            alert('Account deleted successfully')
          }else if(Deleteresponse.status === 404){
            alert("Account not found")
          }
        }
      }catch(err){
        console.log(err)
      }
    }

  return (
    <div className='info-container'>
        <Navbar1/>
      <form action="">
        <div className=''>
          <div>
            <h2>Accounts</h2>
          </div>
          <div className='input-container' style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px' }}>
            <div style={{ marginRight: '10px' }}>
              <input className='input-name' type='text' onChange={handlefilter} placeholder='Search By Name' />
          </div>
          <div style={{ marginRight: '10px' }}>
            <input className='input-id' type='text' placeholder="Search By Id" />
          </div>
          <div>
            <button className='btn btn-success' style={{ marginRight: '10px' }} onClick={handleAdd}>Add +</button>
          </div>
          <div>
            <button className='btn btn-success' onClick={handleDelete}>Delete -</button>
          </div>
        </div>
        <div>
          <DataTable columns={columns}
            data={records} 
            selectableRows
            fixedHeader
            pagination/>
        </div>
        <div>
          {verified && (
            <div className='backbody1'>
              <div>
                <form action="">
                    <div>
                        <h2>Create an account</h2>
                    </div>
                    <div>
                        <div className="form-group mt-3">
                            <Dropdown onSelect={onOptionChangeHandler} id='account_type' name='account_type'>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {selectedOption}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {options.map((option,index)=>{
                                return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>})}
                            </Dropdown.Menu>
                            </Dropdown>
                            {selectedOption==="Business" && (
                                <div className="form-group mt-3">
                                    <input type='text' id='full_name' name='full_name' placeholder='Company Name' onChange={handleInput}/>
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
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {selectedOption1}  
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {options1.map((option,index)=>{
                                return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>})}
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
          )}
          { verified1 && (
            <div className='backbody1'>
              <div>
                <h2>Delete an account</h2>
              </div>
              <div>
                <input placeholder='Insert the account number' name="account_id" id="account_id" onChange={handleInput}/>
                {errors.account_id &&<span className='text-danger'>{errors.account_id}</span>}
              </div>
              <div className='form-group mt-3'>
                <button className="btn btn-primary" onClick={handleDeleteaccount}> Delete account </button>
              </div>  
            </div>  
          )}
        </div>
        </div>
      </form> 
    </div>
  )
}
