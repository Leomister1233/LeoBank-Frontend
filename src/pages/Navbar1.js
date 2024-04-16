import React,{useState} from 'react'
import {Link} from "react-router-dom"
import navbaricon from "../images/navbaricon.png"
import login from "../images/login.png"
import undo from "../images/undo.png"
import { SideNavBar3 } from "./SideNavBar3"
import { SideNavBar4 } from "./SideNavBar4"
import "./Navbar.css"


export const Navbar1 = () => {

    const [sidebar, setSidebar]=useState(false)
    const [sidebar1,setSidebar1]=useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const showSidebar1= () => setSidebar1(!sidebar1)


   return(
   <>
        <div className="navbar">
            <div>
                <Link to="#">
                    <img src={navbaricon} alt="navbar" onClick={showSidebar}/>
                </Link>
            </div>
            <div className="navbar-login" alt="navbar">
                <Link to="#"> 
                    <img src={login} alt="navbar" onClick={showSidebar1} />
                </Link>
            </div>
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
