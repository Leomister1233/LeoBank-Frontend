import React, { useEffect, useState } from 'react'
import {Navbar1} from "../Navbar1";
import "../Navbar.css";
import Dropdown from 'react-bootstrap/Dropdown'
import DataTable from 'react-data-table-component';
import chinese from "../../images/chinese.png"
import stp from "../../images/stp.png"
import eu from "../../images/eu.png"
import usa from "../../images/usa.png"



export const Currency = () => {
  const options=['Euro','Yuan','Dollar','Dobra'];
  const [values,setValues]=useState({
    currencies:"",
    converted_currency:""

  })
  const rate=[{country:'United States', currencies:'USD', rate:''}]

  const [selectedOption, setSelectedOption] = useState("Please choose a transaction");
    const [selectedOption1, setSelectedOption1] = useState("Please select the type of company");

  const handleInput =  (e)=>{
    setValues(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
  }
  const columns = [
    {
      name:'Country',
      selector:row=>row.country,
      sortable:true,
    },
    {
      name:'Sell',
      selector:row=>row.sell,
      sortable:true
    },
    {
      name:'Buy',
      selector:row=>row.buy,
      sortable:true
    },
    {
      cell:(row)=> <img src={getFlagImage(row.country)} alt={row.country} style={{width:'50px' ,height:'auto'}}/>,
      sortable:true
    }
  ]

  const getFlagImage = (country)=>{
     switch(country){
      case 'United States':
        return usa;
      case 'European Union':
        return eu;
      case 'China':
        return chinese
      case 'Sao Tome and Principe':
        return stp;
     }
  }
  

  const onOptionChangeHandler = (selectedOption) => {
    setValues({ ...values, currencies: selectedOption });
    console.log("User Selected Value - ", selectedOption);
    setSelectedOption(selectedOption);
  };

  const onOptionChangeHandler1 = (selectedOption1) => {
    setValues({ ...values, converted_currency: selectedOption1 });
    console.log("User Selected Value - ", selectedOption1);
    setSelectedOption1(selectedOption1);
  };

  return (
    <div>
       <Navbar1/>
      <div className='info-container'>
          <h2>Currency Convertor</h2>
      </div>
      <form action="">
        <div className='title-head1'>
          <h2>From to </h2> 
        </div>
        <div className='tag1'>
          <div >
            <div >
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
            </div>
            <div style={{ marginTop: '10px' }}>
              <input placeholder='insert a value'/>
            </div>
          </div>

          <div>
            <div>
            <Dropdown onSelect={onOptionChangeHandler1} id='transaction_type' name='transaction_type'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedOption1}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {options.map((option,index)=>{
                return <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            </Dropdown>
            </div>
            <div style={{ marginTop: '10px' }}>
              <input placeholder='insert a value'/>
            </div>
          </div>
        </div>
        <div style={{  display: 'flex', justifyContent: 'center', alignContent:'center' }}>
          <button className='btn btn-primary' >Convert</button>
        </div>
        <div>
          <DataTable
          title="Rates"
          columns={columns}/>
          pagination
        </div>
      </form>
    </div>
  )
}
