import React,{useState} from "react"
import settings from "../images/settings.png"
import logout from "../images/logout.png"
import SecureLS from "secure-ls"


export const SideNavBar1 =[
    {
        title:'Settings',
        path:'/settinguser',
        icon:<img src={settings} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Logout',
        path:'/',
        icon:<img src={logout} alt="navbar"/>,
        cname:"nav-text",
        onClick: () => {
            const ls = new SecureLS();
            ls.remove('Usermaster');
        }
    },
]
