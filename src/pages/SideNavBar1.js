import React,{useState} from "react"
import settings from "../images/settings.png"
import adjust from "../images/adjust.png"
import logout from "../images/logout.png"
import { useNavigate } from "react-router-dom"


export const SideNavBar1 =[
    {
        title:'Settings',
        path:'/settings',
        icon:<img src={settings} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Personalize',
        path:'/personalisatino',
        icon:<img src={adjust} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Logout',
        path:'/',
        icon:<img src={logout} alt="navbar"/>,
        cname:"nav-text",
        onClick: () => {
            localStorage.removeItem('Userkey');
        }
    },
]
