import React,{useState} from "react"
import currency1 from "../images/currency1.png"
import users from "../images/users.png"
import home2 from "../images/home2.png"
import loans from "../images/loans.png"
import help1 from "../images/help1.png"
import accounts1 from "../images/accounts1.png"
import transactiosn1 from "../images/transactiosn1.png"
import createaccount from "../images/createaccount.png"
import overview from "../images/overview.png"

export const SideNavBar =[
    {
        title:'Home',
        path:'/homeusers',
        icon:<img src={home2} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Create account',
        path:'/createaccount',
        icon:<img src={createaccount} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Account Overview',
        path:'/accountoverview',
        icon:<img src={overview} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Loans',
        path:'/loans',
        icon:<img src={loans} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Transactions',
        path:'/transaction',
        icon:<img src={transactiosn1} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Currency',
        path:'/currency',
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