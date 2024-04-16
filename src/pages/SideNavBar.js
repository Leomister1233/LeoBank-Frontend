import React,{useState} from "react"
import navbaricon from "../images/navbaricon.png"



export const SideNavBar =[
    {
        title:'Home',
        path:'/homeusers',
        icon:<img src={navbaricon} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Create account',
        path:'/createaccount',
        icon:<img src={navbaricon} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Account Overview',
        path:'/accountoverview',
        icon:<img src={navbaricon} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Loans',
        path:'/loans',
        icon:<img src={navbaricon} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Transactions',
        path:'/transaction',
        icon:<img src={navbaricon} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Currency',
        path:'/currency',
        icon:<img src={navbaricon} alt="navbar"/>,
        cname:"nav-text"
    },
    {
        title:'Help',
        path:'/help',
        icon:<img src={navbaricon} alt="navbar"/>,
        cname:"nav-text"
    },


]