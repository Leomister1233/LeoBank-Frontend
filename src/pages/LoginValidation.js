function validation(value) {
    let error ={}
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

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

    return error;
}
export default validation