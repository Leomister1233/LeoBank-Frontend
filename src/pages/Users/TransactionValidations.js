function validation(value) {
    let error = {};

    const recipient_account_id_pattern=/^\d{5}$/
    const amount_pattern=/^\d+$/
    const validTransactionType = ["Payment", "Withdrawal", "Transfer","Deposit"];
    const validVendorType = ["Utility", "Vendor"];


    if(value.account_id ==="Please select an account"){
        error.account_id = "Please select an Account Number"; 
    }else{
        error.account_id = "";
    }

    if(!validTransactionType.includes(value.transaction_type)){
        error.transaction_type = "Please select the transaction type";
    }else{
        error.transaction_type = "";
    } 

    if(value.transaction_type ==="Payment"){
        if(value.payee_name===""){
        error.payee_name = "Payee Name should not be empty";
        }else{
            error.payee_name ="";
        }

        if(!validVendorType.includes(value.payee_type)){
        error.payee_type="Please choose the type of vendor";
        }else{
            error.payee_type = "";
        }

        if(!validVendorType.includes(value.payee_type)){
            error.payee_type="Please choose the type of vendor";
        }else{
            error.payee_type = "";
        }

        if(value.recipient_account_id===""){
            error.recipient_account_id = "Recipient Account Number should not be empty";
        }
        else if(!recipient_account_id_pattern.test(value.recipient_account_id)){
            error.recipient_account_id="Recipient Account Number Invalid";
        }else{
            error.recipient_account_id = "";
        }

        if(value.amount===""){
        error.amount = "Please insert the transaction amount";
        }
        else if(!amount_pattern.test(value.amount)){
            error.amount = "Invalid Amount inserted, Please enter again(Amount must not include letters or any other sign , can only include numbers!) ";
        }
        else{
            error.amount="";
        }
    }
    else if(value.transaction_type ==="Withdrawal"){
        if(value.amount===""){
            error.amount = "Please insert the transaction amount";
        }
        else if(!amount_pattern.test(value.amount)){
            error.amount = "Invalid Amount inserted, Please enter again(Amount must not include letters or any other sign , can only include numbers!) ";
        }
        else{
            error.amount="";
        }
    }
    else if(value.transaction_type ==="Transfer"){
        if(value.recipient_account_id===""){
            error.recipient_account_id = "Recipient Account Number should not be empty";
        }
        else if(!recipient_account_id_pattern.test(value.recipient_account_id)){
            error.recipient_account_id="Recipient Account Number Invalid";
        }else{
            error.recipient_account_id = "";
        }

        if(value.amount===""){
        error.amount = "Please insert the transaction amount";
        }
        else if(!amount_pattern.test(value.amount)){
            error.amount = "Invalid Amount inserted, Please enter again(Amount must not include letters or any other sign , can only include numbers!) ";
        }
        else{
            error.amount="";
        }
    }
    else if(value.transaction_type ==="Deposit"){
        if(value.amount===""){
            error.amount = "Please insert the transaction amount";
        }
        else if(!amount_pattern.test(value.amount)){
            error.amount = "Invalid Amount inserted, Please enter again(Amount must not include letters or any other sign , can only include numbers!) ";
        }
        else{
            error.amount="";
        }
    }
    return error;
}
export default validation;
