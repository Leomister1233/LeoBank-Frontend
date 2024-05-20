function validation(value){
    let error = {} ;
    const validOptions1 = ['Personal','Business','Student'];
    const validOptions3 = ['Monthly','Quarterly','Annual'];
    const validOptions4= ['5','10','15','20','25','30'];
    const amount_pattern=/^\d+$/

    if(value.full_name ===""){
        error.full_name= "Full Name should not be empty"; 
    }else{
        error.full_name=""
    }

    if(value.account_id === "Please select a Account"){
        error.account_id = "Please select an Account Number"
    }
    else{
        error.account_id=""
    }

    if(value.loan_amount === ""){
        error.loan_amount= "Loan Amount should not be empty";
    }
    else if(!amount_pattern.test(value.loan_amount)){
        error.loan_amount="Invalid Amount inserted, Please enter again(Amount must not include letters or any other sign , can only include numbers!) ";
    }
    else{
        error.loan_amount=""
    }
 
    if(value.loan_reason === ""){
        error.loan_reason="This field Should not be empty!"
    }
    else{
        error.loan_reason=""
    }
    
    if(!validOptions1.includes(value.loan_type)){
        error.loan_type="Please choose a loan type!"
    }else{
        error.loan_type=""
    }

    if(!validOptions3.includes(value.loan_paymenttype)){
        error.loan_paymenttype="Please choose the type of payment for the loan"
    }
    else{
        error.loan_paymenttype=""
    }

    if(!validOptions4.includes(value.loan_term)){
        error.loan_term="Please choose the duration of the loan"
    }
    else{
        error.loan_term=""
    }


    // Validate other fields if needed

    return error;
    
}
export default validation;