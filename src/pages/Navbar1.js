import React,{useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import navbaricon from "../images/navbaricon.png"
import login from "../images/login.png"
import undo from "../images/undo.png"
import { SideNavBar3 } from "./SideNavBar3"
import { SideNavBar4 } from "./SideNavBar4"
import "./Navbar.css"
import SecureLs from 'secure-ls';
import axios from 'axios'


export const Navbar1 = () => {

    const [sidebar, setSidebar]=useState(false)
    const [sidebar1,setSidebar1]=useState(false);
    const [verified,setVerified]=useState(false);
    const showSidebar = () => setSidebar(!sidebar)
    const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret:'themisterkey1234'});
    const key=ls.get('Usermaster');
    const showSidebar1= () => setSidebar1(!sidebar1)
    const [imageSrc,setImageSrc]=useState();
    useEffect(() =>{
        const fetchImage = async () =>{
            try{
              const user_id = encodeURIComponent(key);
              const response= await axios.get('https://localhost:8801/api/getimagebyId' ,
              {params:{user_id}, 
              responseType:'arraybuffer',},{
                
              })
              if(response.status === 200){
                const contentType = response.headers['content-type'];
                console.log()
                const base64String = btoa(
                    new Uint8Array(response.data).reduce(
                        (data,byte) => data + String.fromCharCode(byte),
                    ''
                    )
                );
                const imageUrl = `data:${contentType};base64,${base64String}`
                console.log(imageUrl)
                setImageSrc(imageUrl);
                setVerified(true);
              }else{
                alert('Something went wrong')
              }
            }catch(err){
              console.error('Error:', err);
            }
          }
          fetchImage();
    },[])


   return(
   <>
        <div className="navbar"> 
            <div>
                <Link to="#">
                    <img src={navbaricon} alt="navbar" onClick={showSidebar} />
                </Link>
            </div>
            { verified && (
                <div className="navbar-login" alt="navbar">
                    <Link to="#"> 
                        <img src={imageSrc} alt="navbar" onClick={showSidebar1} className='image'/>
                    </Link>
                </div>
            )}
            {!verified && (
                <div className="navbar-login" alt="navbar">
                    <Link to="#"> 
                        <img src={login } alt="navbar" onClick={showSidebar1} />
                    </Link>
                </div>
            )}
            
           
        </div>
        <nav className={`nav-menu ${sidebar ? 'active' : ''}`} >
            <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                    <Link to="#" className="menu-bars1">
                        <img src={undo} alt="closeicon"/>
                    </Link>
                </li>
                {SideNavBar3.map((item,index) => {
                    return(
                        <li key={index} className={item.cname}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
        <nav className={`nav-menu1 ${sidebar1? 'active' : ''}`} >
            <ul className="nav-menu-items1" onClick={showSidebar1}>
                <li className="navbar-toggle1">
                    <Link to="#" className="menu-bars1">
                        <img src={undo} alt="closeicon"/>
                    </Link>
                </li>
                {SideNavBar4.map((item,index) => {
                    return(
                        <li key={index} className={item.cname}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    </>
  )
}
