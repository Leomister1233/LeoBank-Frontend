function validation(value) {
    let error ={}
    const otp_pattern = /^\d{4}$/

    if(value.otp===""){
        error.otp="Otp should not be empty"
    }else if (!otp_pattern.test(value.otp)){
        error.otp="Otp should not be empty"
    }else{
        error.otp=""
    }

    return error;
}
export default validation