import React, {useEffect,useState} from 'react'
import { Navbar1 } from '../Navbar1';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import '../GridComponent.css';

export const Users = () => {

    const [user,setUser]=useState([]);
    useEffect(() => {
    fetch('https://localhost:8801/api/users2')
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
          name:"password_hash",
          selector: row=> row.password_hash,
          sortable: true
        },
        {
            name:"email",
            selector: row=> row.email,
            sortable: true
        },
        {
            name:"full_name",
            selector: row=> row.full_name,
            sortable: true
        },
        {
            name:"date_birth",
            selector: row=> row.date_of_birth,
            sortable: true
        },
        {
            name:"created_at",
            selector: row=> row.created_at,
            sortable: true
        }
    
    ];
    const navigate= useNavigate()
    const [records,setRecords] = useState(user);
    function handlefilter(e){
        const newUser = user.filter(row =>{
            return row.username.toLowerCase().includes(e.target.value.toLowerCase())
        });
        setRecords(newUser);
    }

    const handleAdd = (e) =>{
        e.preventDefault();
        navigate('/adduser')
    }
    
    const handleDelete = (e) =>{
        e.preventDefault();
        navigate('/deleteuser')
    }
  return (
    <div className='home-container'>
        <Navbar1/>
        <form action="">
            
        </form>
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-0 bg-white rounded p-3'>
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
            </div>
        </div>
    </div>
  )
}
