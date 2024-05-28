import React from 'react'
import {Navbar} from "../Navbar";

export const UserHelp = () => {
  return (
    <div>
        <Navbar/>
        <div className=''>
        <div>
          <div>
            <h2>Home</h2>
            <pr>In the Home component you can acess the balance( your password is the same used for login). You can also see you most recent transactions and make quick payments and transfers  </pr>
          </div>
          <div>
            <h2>Account Overview</h2>
            <pr>You can see your accounts details 
            </pr>
          </div>
          <div>
            <h2>Create Accounts</h2>
            <pr>You can create your bank account 
            </pr>
          </div>
          <div>
            <h2>Transactions</h2>
              <pr>You can exxecute the 4 available transactions (Deposit, Transfers, Withdrawal, and Payments)
              </pr>
          </div>
          <div>
            <h2>Loans</h2>
            You can request loans from the system
          </div>
          <div>
            <h2>Currency</h2>
            <pr>
              You can make  currency conversions, acording to the currencies and rates available
            </pr>
          </div>
        </div>
        </div>
    </div>
  )
}
