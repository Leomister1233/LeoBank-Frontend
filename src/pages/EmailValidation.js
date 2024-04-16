function validation(value) {
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(value.email===""){
        error.email="Email should not be empty"
    }else if (!email_pattern.test(value.email)){
        error.email="Email didn't match"
    }else{
        error.email=""
    }
    return error
}
export default validation