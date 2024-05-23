import React,{useState,useEffect} from 'react'
import '../pagestyle.css';
import {Navbar1} from "../Navbar1"; 
import DataTable from 'react-data-table-component';

export const Transactions1 = () => {
    const [transactions,setTransactions]=useState(); 
    const fetchtransactions = async () => {
        const responseTransactions= await fetch('https://localhost:8801/api/getransactions1')
        const gettransaction= await responseTransactions.json();
        setTransactions(gettransaction);
    } 
    useEffect(() =>{
        fetchtransactions();
    },[])

    const [values,setValues]=useState({
        transaction_id:'',
        searchid:''
    });

    const handleInput =  (e)=>{
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        if(values.searchid===""){
            fetchtransactions();
        }
    }
    const columns=[
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
    ]

    const handlefilter=(e)=>{
        e.preventDefault();
        if(values.searchid!==""){
            console.log(values.searchid)
            const newUser = transactions.filter(row =>row.transaction_id===parseInt(values.searchid));
            console.log(newUser)
            setTransactions(newUser);
            console.log(transactions)
        }else{
            fetchtransactions()
        }
    }

    return (
        <div className='info-container'>
        <Navbar1/>
            <div>
                <div>
                    <div className="row justify-content-center">
                        <div className=" cold-md-5">
                            <div >
                                <form action="">
                                    <div>
                                        <h2> All Transactions</h2>
                                    </div>
                                    <div className='recent-activity2'>
                                        <input placeholder='Search by Transaction Id '  name='searchid' id='searchid' onChange={handleInput}/>
                                        <button onClick={handlefilter}>Search</button>
                                    </div>
                                    <div className='backbody1'>
                                        <DataTable 
                                            columns={columns}
                                            data={transactions}
                                            selectableRows
                                            fixedHeader
                                            pagination
                                        />
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

