function validation(value){
    let error = {};
    if(value.currency===""){
        error.currency="This field is required"
    }
    else{
        error.currency=''
    }

    if(value.rate===""){
        error.rate= 'This field is required'
    }else{
        error.rate="";
    }

}

export default validation;
