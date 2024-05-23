function validation(value) {
    let error ={}
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const otp_pattern = /^\d{4}$/;

    if(value.username===""){
        error.username="Name should not be empty"
    }else{
        error.username=""
    }

    if(value.password===""){
        error.password="Password should not be empty"
    }else if (!password_pattern.test(value.password)){
        error.password="The password must contain at least one digit, one lowercase letter, one uppercase letter, and is at least 8 characters long, with no spaces or special characters allowed."
    }else{
        error.password=""
    }

    if(value.pin===""){
        error.pin = "PIN should not be empty";
    }else if (!otp_pattern.test(value.pin)) {
      error.pin = "Pin should be a 4-digit number";
    }
    else{
      error.pin=""
    }
    return error;
}
export default validation