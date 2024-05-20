import React from 'react'
import currency1 from "../images/currency1.png"
import users from "../images/users.png"
import home2 from "../images/home2.png"
import loans from "../images/loans.png"
import help1 from "../images/help1.png"
import accounts1 from "../images/accounts1.png"
import transactiosn1 from "../images/transactiosn1.png"
import createaccount from "../images/createaccount.png"


export const SideNavBar3 = [
    {
        title:'Home',
        path:'/home',
        icon:<img src={home2} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Users',
        path:'/users',
        icon:<img src={users} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Accounts',
        path:'/accounts',
        icon:<img src={accounts1} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Transactions',
        path:'/transactions1',
        icon:<img src={transactiosn1} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Pending Loans',
        path:'/pendingrequests',
        icon:<img src={loans} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Admin Currency',
        path:'/currencyadmin',
        icon:<img src={currency1} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Help',
        path:'/help',
        icon:<img src={help1} alt="navbar"/>,
        cname:"nav-text"
    },
  ]

