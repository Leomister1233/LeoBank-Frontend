import React,{useState,useEffect} from 'react'
import DataTable from 'react-data-table-component';
import {Navbar} from "../Navbar";
import login from "../../images/login.png"
import axios from 'axios';
import SecureLs from 'secure-ls';
import { ENCRYPTION_KEY } from '../../config';

export const AccountOverview = () => {
    const [items, setItems] = useState([]);
    const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret:ENCRYPTION_KEY});
    const key=ls.get('Usermaster');
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [data ,setdata]=useState([]);
    const [values,setValues]=useState({
        user_id:"",})
    const columns=[ 
        {
            name:"User No",
            selector:row=>row.user_id,
            sortable:true
        },
        {
            name:"Account Holder Name",
            selector:row=>row.full_name,
            sortable:true
        },
        {
            name:"Account Type",
            selector:row=>row.account_type,
            sortable:true,
        },
        {
            name:"Address",
            selector:row=>row.address,
            sortable:true
        },
        {
            name:"Country of Origin",
            selector:row=>row.country,
            sortable:true
        },
        {
            name:"Account Creation Date",
            selector:row=>row.created_at,
            sortable:true
        }
    ]
    const handleItemClick = (itemId) => {
        setSelectedItemId(itemId); 
        console.log('item seleced',selectedItemId);
    };
    
    useEffect (()=>{
        const fetchAccounts = async () =>{
            try{
                values.user_id = key;
                console.log(key);
                const checkResponse= await axios.post("https://localhost:8801/checkaccounts",values)
                if(checkResponse.data.message==="Account found"){
                    const encodedUser=encodeURI(key);
                    const responseAccounts = await fetch (`https://localhost:8801/api/getaccountsid?user_id=${encodedUser}`)

                    if(!responseAccounts.ok){
                        throw new Error('Network error');
                    }

                    const AccountData = await responseAccounts.json();
                    setItems(AccountData)
                    console.log("Account retrieved",AccountData);
                }else{
                    alert("No accounts were found, Please create a new account ")
                }
            }catch(error){
                console.error("Error fetching accounts",error)
            }
        }
        fetchAccounts()
    },[key]);

    useEffect(()=>{
        const fetchAccountInfo =async()=>{
            values.user_id = key;
            const checkResponse= await axios.post("https://localhost:8801/checkaccounts",values)
            if(checkResponse.data.message==="Account found"){
                if(selectedItemId){
                    const responseAccountInfo= await fetch(`https://localhost:8801/api/getaccountsbyid?account_id=${selectedItemId}`);
                    if(!responseAccountInfo.ok){
                        throw new Error("Network Error")
                    }
                    const AccountInfo= await responseAccountInfo.json();
                    setdata(AccountInfo);
                    console.log("Account info: ", responseAccountInfo) ;
                }
            }
        }
        fetchAccountInfo();
    },[selectedItemId])

    return (
        <div className='backbody'>
             <Navbar/>
            <div className='title-head'>
                <h1>Account Overview</h1>
            </div>
            <div>
                <div>
                    <h3>Choose from the available Accounts</h3>
                </div>
                <div>
                    <ul className='list'>
                        {items.map(item => (
                            <li key={item.account_id} className='list-child' >
                                <img src={login} alt='new' style={{ marginRight: '20px' }}/> 
                                {item.account_id}
                                <input
                                    className='input-list'
                                    type="radio"
                                    name="account"
                                    value={item.account_id}
                                    style={{ marginLeft: '30px' }}
                                    checked={selectedItemId === item.account_id}
                                    onChange={() => handleItemClick(item.account_id)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <DataTable
                columns={columns}
                data={data}
                pagination
                    />
            </div>
        </div>
    );
}
