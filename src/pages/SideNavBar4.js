import React from 'react'
import adjust from "../images/adjust.png"
import logout from "../images/logout.png"
import SecureLS from 'secure-ls'

export const SideNavBar4 = [
    {
        title:'Settings',
        path:'/settings',
        icon:<img src={adjust} alt="navbar"/>,
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
    }
]
