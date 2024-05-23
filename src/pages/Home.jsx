import React,{useState, useEffect} from 'react';
import {Navbar1} from "./Navbar1";
import { Link } from "react-router-dom";
import "./Home.css";
import "./Navbar.css";
import DataTable,{createTheme} from 'react-data-table-component';
import SecureLs from 'secure-ls';

export const Home = () => {

   const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret:'themisterkey1234'});
  const key=ls.get('Usermaster');
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

  const [users,setUsers]= useState();
  const [account,setAccount]=useState();
  const [transactions,setTransactions]=useState();
 
  useEffect(() => {
    const fetchBalance = async () => {
      try {
          values.user_id = key;
          const fetchUsers= await fetch('https://localhost:8801/api/userslimit')
          const getusers = await fetchUsers.json()
          setUsers(getusers);
          console.log(users)
          const fetchaccounts = await fetch('https://localhost:8801/api/getaccountslimit')
          const getaccounts= await fetchaccounts.json(); 
          setAccount(getaccounts)
          const fetchtransactions= await fetch('https://localhost:8801/api/getransactions')
          const gettransaction = await fetchtransactions.json();
          setTransactions(gettransaction)
        } catch (error) {
          console.error('Error fetching data:', error);
      }
    };
    fetchBalance();
  }, [values,key]); // Empty dependency array to ensure the effect runs only once on component mount

  const columns1=[
    {
      name:"user_id",
      selector: row=> row.user_id,
      sortable: true
    },
    {
      name:"username",
      selector: row=> row.username,
      sortable: true
    },
    {
      name:"email",
      selector: row=> row.email,
      sortable: true
    },
    {
      name:"Created At",
      selector: row=> row.created_at,
      sortable: true
    }
  ]

  const columns2 =[
    {
      name:"account_id",
      selector: row=> row.account_id,
      sortable: true
    },
    {
      name:"account_type",
      selector:row=> row.account_type,
      sortable:true
    },
    {
      name:"created_at",
      selector:row=>row.created_at,
      sortable:true
    }
  ]

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
      name:"amount",
      selector: row=> row.amount,
      sortable: true
    },
    {
      name:"description",
      selector: row=> row.description,
      sortable: true
    }
  ];

  createTheme('solarized', {
    background: {
      default: 'rgb(191, 206, 206)',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
  });

  createTheme('solarized1',{
    background:{
      default:'rgb(178, 178, 197)'
    },
    context:{
      background:'#cb4b16',
      text:'#FFFFFF'
    },
    divider:{
      default:'#073642',
    }
  })

  createTheme('solarized2',{
    background:{
      default:'rgb(221, 234, 235)'
    },
    context:{
      background:'#cb4b16',
      text:'#FFFFFF'
    },
    divider:{
      default:'#073642',
    }
  })

  return ( 
      <div className='backbody'>
        <Navbar1/>
        <div className='info-container'>
          <form action="" >
            <div className='title-head'>
              <h1>Welcome to the Bank of Leo </h1>
            </div>
            <div className='container'>
              <div className='bank-balance'>
                <div className='tag'>
                  <h1>Users</h1>
                </div>
                <div>
                  <div className='balance-select'>
                    <DataTable
                    columns={columns1}
                    data={users}
                    theme="solarized" />
                  </div>
                  <div className='form-group mt-3'>
                    <Link to='/users'>Show all </Link>
                  </div>
                </div>
              </div>
              <div className='send-request'>
                <div>
                  <h2>Recent Accounts</h2>
                </div>
                <div>
                   <DataTable
                    columns={columns2}
                    data={account}
                    fixedHeader
                    pagination
                    theme="solarized1" 
                   />
                </div>
                <div className='form-group mt-3'>
                  <Link to='/accounts'>Show all </Link>
              </div>
              </div>
            </div>
           <div className='recent-activity'>
              <h2>Recent Transaction History</h2>
              <div>
                <DataTable
                  columns={columns}
                  data={transactions}
                  fixedHeader
                  pagination
                  theme="solarized2" 
                />
              </div>
              <div className='form-group mt-3'>
                  <Link to='/transactions1'>Show all </Link>
              </div>
            </div>
          </form>
        </div>
      </div>       
  )
}
