import React from 'react'
import adjust from "../images/adjust.png"
import logout from "../images/logout.png"

export const SideNavBar4 = [
    {
        title:'Personalize',
        path:'/personalization',
        icon:<img src={adjust} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Logout',
        path:'/',
        icon:<img src={logout} alt="navbar"/>,
        cname:"nav-text"
    }
]
