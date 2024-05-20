import React, { useEffect, useState } from 'react'
import {Navbar} from "../Navbar";
import axios from 'axios';
import "../Home.css";
import login from '../../images/login.png';
import SecureLs from 'secure-ls'
import validation from './SettingsUservalidation';


export const SettingsUser = () => {
  const[verified,setVerified]= useState(false);
  const [verified1,setVerified1]=useState(false);
  const [verified6,setVerified6]=useState(false);
  const [errors,setErrors] = useState({})
  const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret:'themisterkey1234'});
  const key=ls.get('Usermaster');
  const [verified2,setVerified2]=useState(false);
  const [verified3,setVerified3]=useState(false);
  const [imageSrc,setImageSrc]=useState('');
  const [activated,setAcctivated]=useState(null);
  const [email,setEmail]=useState(null);
  const [values,setValues]=useState({
    user_id:'',
    username:'',
    password:'',
    confirmpassword:'',
    question:'',
    answer:'',
    email:'',
    pin:'',
    confirmpin:'',
  });

  const [image,setImage]=useState();
  const handleInput= (e)=>{
    setValues(prev => ({
      ...prev, 
      [e.target.name]:e.target.value
    }));
  }

  const handleImage = (e) =>{
    setImage(e.target.files[0]);
  }


  useEffect(()=>{
    const fetchinfo = async()=>{
      try{
        const user_id = encodeURIComponent(key);
        const profile = await axios.get(`https://localhost:8801/api/profilecheck?user_id=${user_id}`);
        setAcctivated(profile.data.activated);
        const getemail=await axios.get("https://localhost:8801/api/getemail",{params:{user_id}});
        setEmail(getemail.data[0].email);
        values.user_id=key;
        values.email=getemail.data[0].email;
      }catch(err){
        console.log('Error:', err);
      }
    }
    const fetchImage = async () =>{
      try{
        const user_id = encodeURIComponent(key);
        const response= await axios.get('https://localhost:8801/api/getimagebyId' ,
        {params:{user_id}, 
        responseType:'arraybuffer',},{
          
        })
        if(response.status === 200){
          const contentType = response.headers['content-type'];
          const base64String = btoa(
            new Uint8Array(response.data).reduce(
              (data,byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const imageUrl = `data:${contentType};base64,${base64String}`
        setImageSrc(imageUrl);
        setVerified6(true);
        }else{
          alert('Something went wrong')
        }
        
      }catch(err){
        console.error('Error:', err);
      }
    }
    fetchImage();
    fetchinfo();
  },[key])

  const showUpdateinfo=(e)=>{
    e.preventDefault();
    setVerified(true);
    setVerified1(false);
    setVerified2(false);
    setVerified3(false);
  }

  const showTWO=(e)=>{
    e.preventDefault();
    setVerified(false);
    setVerified1(true)
    setVerified2(false);
    setVerified3(false);
  }

  const updatePin=async(e)=>{
    e.preventDefault();
    setVerified3(true);
    setAcctivated(false); 
    setVerified1(false);
  }

  const updateDisable = async(e)=>{
    e.preventDefault();
    const setdisable =await axios.post('https://localhost:8801/disable',values);
    if(setdisable.status===200){
      alert('Two- factor authentication disabled');
    }
  }

  const showUpdateimage= (e)=>{
    e.preventDefault();
    setVerified2(true);
    setVerified(false);
    setVerified1(false);
    setVerified3(false);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setErrors(validation(values));
    console.log('Current values state:', values);
    try{  
      if(errors.username===""  && errors.password===""){
         const inforesponse= await axios.post("https://localhost:8801/updateInfo",values)
        if(inforesponse.status ===200){
          alert('Data updated successfully');
        }
      } 
    }
    catch(err){
      console.log("An error occurred")
    }
  }

  const handleUpload = async(e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append('user_id',key);
    console.log(image);
    formData.append('image',image);
    try{
      const uploadimage= await axios.post('https://localhost:8801/upload',formData,{
        headers: {'Content-Type': 'multipart/form-data'},
      })
      if(uploadimage.status===200){
        alert('Image uploaded successfully');
      }else{
        alert('Error uploading image')
      }
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }
  
  const handlesecurity = async(e)=>{
    e.preventDefault();
    setErrors(validation(values));
    console.log(errors.pin)
    try{ 
      if(errors.pin===""  && errors.question===""){
        const sendpininfo= await axios.post('https://localhost:8801/updatepin',values);
        const sendsecurity = await axios.post('https://localhost:8801/updatequestions',values);
        if(sendpininfo.status===200 &&  sendsecurity.status===200){
          alert('Two factor authentication enabled')
        }
      }
      //window.location.reload();
    }catch(err){
      console.log('Error',err);
    }
  }

  return (
    <div className='backbody'>
    <Navbar/>
      <div>
        <form>
          <div>
            <div>
              <h2>Settings</h2>
            </div>
            <div>
              {verified6 && (
                <div className='image-container'>
                  <img src={imageSrc} alt='hello' className='image'/>
                </div>
              )}
              {!verified6 && (
                <div>
                  <img src={login} alt='hello'/>
                </div>
              )}
            </div>
            <div className='list4'>
              <ul className='list3'>
                <li onClick={showUpdateimage}>Change profile image</li>
                <li onClick={showUpdateinfo}>Update User Info</li>
                <li onClick={showTWO}>Enable two-factor authentication</li>
              </ul>
            </div>
            <div className='set-container'>
              {verified && (
                <div className='card2'>
                  <div className='card-body'>
                    <div className='form-group mt-3'>
                      <input name='username' id='username' placeholder='username' onChange={handleInput}/>
                      {errors.username && <span className='text-danger'>
                        {errors.username}</span>}
                    </div>
                    <div className='form-group mt-3'>
                      <input name='password' id='password' placeholder='password' onChange={handleInput}/>
                      {errors.password &&<span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='form-group mt-3'>
                      <input name='confirmpassword' id='confirmpassword' placeholder='Confirm password' onChange={handleInput}/>
                      {errors.password &&<span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='form-group mt-3'>
                      <input name='email' id='email' placeholder='email' onChange={handleInput}/>
                      {errors.email &&<span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='form-group mt-3'>
                      <button className='btn btn-primary' onClick={handleSubmit}>Confirm changes</button>
                    </div>
                  </div>
                </div>
              )}
              {verified1 && activated===false && (
                <div>
                  <div className='enable-container'>
                    <button className='btn btn-primary' onClick={updatePin}>Enable</button> 
                  </div>
                </div>
              )}
              {verified3 && (
                <div>
                  <div className='card2'>
                    <div className="card-body">
                      <div className='form-group mt-3 '>
                        <input type='password' name='pin' id='pin' placeholder='Please create a new pin' onChange={handleInput}/>
                        {errors.pin &&<span className='text-danger'>{errors.pin}</span>}
                      </div >
                      <div className='form-group mt-3'>
                        <input type='password' name='confirmpin' id='confirmpin' placeholder='Please confirm the pin' onChange={handleInput}/>
                        {errors.confirmpin &&<span className='text-danger'>{errors.confirmpin}</span>}
                      </div>
                      <div className='form-group mt-3'>
                        <input placeholder='Create a security question' name='question' id='question' onChange={handleInput}/>
                        {errors.question &&<span className='text-danger'>{errors.question}</span>}
                      </div>
                      <div className='form-group mt-3'>
                        <input placeholder='Create and security answer' name='answer' id='answer' onChange={handleInput}/>
                        {errors.answer &&<span className='text-danger'>{errors.answer}</span>}
                      </div>
                      <div>
                        <button className='btn btn-primary' onClick={handlesecurity}>Confirm</button>
                      </div>
                    </div>
                  </div> 
                </div>    
              )}
              {verified1 && activated===true && (
                <div className=''>
                  <div className='enable-container'>
                    <button className='btn btn-primary' onClick={updateDisable}>Disable</button>
                  </div>
                </div>
              )}
              { verified2 && (
                <div className='enable-container'>
                  <div className='card'>
                    <div className='card-body'>
                      <input type="file" name='image' id='image' onChange={handleImage}/>
                      <button onClick={handleUpload}>Upload Image</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div> 
        </form>
      </div>
    </div>
  )
}
