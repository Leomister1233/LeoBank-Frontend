import React from 'react'
import {Navbar1} from "../Navbar1";
import "../Navbar.css";

export const Help = () => {
  return (
    <div>
      <Navbar1/>
      <div>
        <div>
          <h2>Home</h2>
          <pr>In the Home component you can visualize the registered users, accounts and transactions made in the system  </pr>
        </div>
        <div>
          <h2>Users</h2>
          <pr>You can visualize delete and add users.<br/>
              To add users press the 'add user button'<br/>
              To delete an user select the user to be deleted and
              press the delete button.<br/>
              You can also search by the user Id and the Name
          </pr>
        </div>
        <div>
          <h2>Accounts</h2>
          <pr>You can accounts by pressing the add button (the user must be registered ) <br/>
              You can also delete accounts by selecting form the available ones.
          </pr>
        </div>
        <div>
          <h2>Transactions</h2>
            <pr>You can visualize and track the transactions made by the user.
            </pr>
        </div>
        <div>
          <h2>Pending Loans</h2>
          You can accept or reject pending loans , by pressing the accept button or the reject buttoon.
        </div>
        <div>
          <h2>Admin Currency</h2>
          <pr>
            Add currencies to the system and the respective rate.
          </pr>
        </div>
      </div>
    </div>
  )
}
