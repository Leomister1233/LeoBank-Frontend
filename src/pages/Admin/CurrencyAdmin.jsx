import React,{ useState } from 'react'
import { Navbar1 } from '../Navbar1'
import axios from 'axios'
import validation from './CurrencyValidations'

export const CurrencyAdmin = () => {
  const [values,setValues]=useState({
      currency:'',
      rate:''
  });
  const [errors,setErrors]=useState();
  const [image,setImage]=useState();


  const handleImage = (e) =>{
    setImage(e.target.files[0]);
  }
  const handleInput = (e) =>{
    setValues(prev => ({...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setErrors(validation(values));
    const formatData = new FormData();
    formatData.append('currency', values.currency);
    formatData.append('rate',values.rate);
    formatData.append('image',image)
    try{
      if(errors.curency==="" && errors.rate==="" ){
         const uploadresponse = await axios.post('https://localhost:8801/uploadrates', formatData,{
          headers:{'Content-Type': 'multipart/form-data'}
        }) 
        console.log(uploadresponse.status)
        if(uploadresponse.status === 200){
          alert('Info uploaded successfully')
        }
      }
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='backbody'>
        <Navbar1/>
        <div>
          <div className='title-head'>
            <h2>Add a Currency</h2>
          </div>
            <form>
              <div className='card'>
                <div className='card-body'>
                  <div className='form-group mt-3'>
                    <input placeholder='Input the name of the currency' name='currency' id='currency' onChange={handleInput}/>
                  </div>
                  <div className='form-group mt-3'>
                    <input placeholder='Input the rate of the currency' name='rate' id='rate' onChange={handleInput}/>
                  </div>
                  <div>
                    <input type="file" name="image" id='image' onChange={handleImage}/>
                  </div>
                  <div>
                    <button className='btn btn-primary' onClick={handleSubmit} >Submit</button>
                  </div>
                </div>
              </div>
            </form>
        </div>
    </div>
  )
}
