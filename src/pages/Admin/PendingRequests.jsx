import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import { Navbar1 } from '../Navbar1'
import DataTable from 'react-data-table-component';
import {Button} from 'react-bootstrap'


export const PendingRequests = () => {
    const [loans,setloans]=useState('');
    const [users,setusers]=useState('');
    const [values,setValues]=useState({
        loan_id:'',
        searchid:''
    });
    const handleInput =  (e)=>{
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        if(values.searchid===""){
            fetchusers()
        }

      }
    useEffect(()=>{
      FetchLoans()
      fetchusers()

    },[])
    const fetchusers = async ()=>{
        try{
            const usersResponse= await axios.get("https://localhost:8801/getaccountinfo")
            console.log(usersResponse)
            console.log("Values Received", usersResponse.data)
            setusers(usersResponse.data)
        }catch(err){

        }
    }  
    const FetchLoans = async ()=>{
        try{
            const loansResponse= await axios.get('https://localhost:8801/loans')
            console.log(loansResponse);
            console.log("Values Received",loansResponse.data); 
            setloans(loansResponse.data);
        }
        catch(err){
            console.log("Error fetching Loans",err);
        }            
    } 
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
            name:"Amount to be payed (per select period)",
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
            name:"Approve",
            cell:(row)=>(<Button color="primary" onClick={(e)=>handleButtonclick(row,e)}>Approve</Button>)
        },
        {
            name:"Reject",
            cell:(row)=>(<Button color="primary" onClick={(e)=>handleButtonReject(row,e)}>Reject</Button>)
        }
    ]

    const columns1 =[
        {
          name:"user_id",
          selector: row=> row.user_id,
          sortable: true
        },
        {
            name:"full_name",
            selector: row=> row.full_name,
            sortable: true
        },
        {
            name:"account_id",
            selector: row=> row.account_id,
            sortable: true
        },
        {
            name:"account_type",
            selector: row=> row.created_at,
            sortable: true
        },
        {
            name:"Balance",
            selector:row=>row.balance,
            sortable:true
        },
        {
            name:"Created_at",
            selector:row=>row.created_at,
            sortable:true
        }
    
    ];

    const handleButtonclick = async(row,e)=>{
        e.preventDefault();
        console.log(row.loan_id);
        values.loan_id=row.loan_id;
        try{
            const approveResponse = await axios.post("https://localhost:8801/updateApprove",values)
            if(approveResponse.data.message==="Update Successful"){
            alert("Update Successful")
            }
        }catch(err){
            console.log("Error",err)
        }
    }

    const handleButtonReject = async(row,e)=>{
        e.preventDefault();
        console.log(row.loan_id);
        values.loan_id=row.loan_id;
        try{
            const approveResponse = await axios.post("https://localhost:8801/updateRejected",values)
            if(approveResponse.data.message==="Update Successful"){
            alert("Update Successful")
            }
        }catch(err){
            console.log("Error",err)
        }
    }

    const handlefilter=(e)=>{
        e.preventDefault();
        if(values.searchid!==""){
            console.log(values.searchid)
            const newUser = users.filter(row =>row.user_id===parseInt(values.searchid));
            console.log(newUser)
            setusers(newUser);
        }else{
            fetchusers()
        }
    }

  return (
    <div className='info-container'>
        <Navbar1 />
        <div>
            <h3>Loans Requests</h3>
        </div>
        <div>
            <DataTable
                columns={columns}
                data={loans}
                pagination
            />
        </div>
        <div>
            <div className='recent-activity2'>
                <h2> Search users information</h2>
                <div>
                    <input name="searchid" id="searchid" onChange={handleInput} placeholder='Search by ID'/>
                    <button onClick={handlefilter}>Search</button>
                </div>
                    
                <div>
                <DataTable
                    columns={columns1}
                    data={users}
                    pagination
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
