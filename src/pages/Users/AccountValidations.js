function validation(value) {
    let error = {};

    const validAccountOptions = ['Checking', 'Savings', 'Business'];
    const validCountryOptions = ['Portugal','Sao Tome and Principe','Cabo Verde','Guine Bissao','Angola'];

    if(value.user_id ===""){
        error.user_id = "User Id should not be empty"; 
    }
    
    else if (!validAccountOptions.includes(value.account_type)) {
        error.account_type = "Please select a account type";
    } else {
        error.account_type = "";
    }

    if(value.full_name === ""){
        error.full_name = "Full_Name should not be empty";
    }

    if(value.address === ""){
        error.address = "Address should not be empty";
    }

    // Validate the country dropdown
    if (!validCountryOptions.includes(value.country)) {
        error.country = "Please select a country";
    } else {
        error.country = "";
    }

    // Validate other fields if needed

    return error;
}

export default validation