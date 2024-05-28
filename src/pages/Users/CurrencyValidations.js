function validation (value){
    let error ={};

    const numericRegex = /^[0-9]*\.?[0-9]*$/;

    if(value.currencies ==="Please select a currency"){
        error.currencies = "One currency must be selected"; 
    }else{
        error.currencies = "";
    }

    if(value.converted_currency === "Please select a currency"){
        error.currencies = "One currency must be selected"
    }else{
        error.converted_currency= "";
    }

    if(value.value1 === ""){
        error.value1="Insert a value "
    }else if(!numericRegex.test(value.value1)){
        error.value1="The input must be a number and cannot contain letters "
    }else{
        error.value1=""; 
    }

    return error;
}

export default validation;