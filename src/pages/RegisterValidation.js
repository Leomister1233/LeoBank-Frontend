function validation(value) {
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const full_name_pattern=/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/
    const date_pattern=/^\d{4}-\d{2}-\d{2}$/

    const validRoleOptions=['Client','Admin']

    if(value.username===""){
        error.username="username should not be empty"
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
    if(value.email===""){
        error.email="Email should not be empty"
    }else if (!email_pattern.test(value.email)){
        error.email="Email didn't match"
    }else{
        error.email=""
    }

    if(value.full_name===""){
        error.full_name="Full name should not be empty"
    }else if(!full_name_pattern.test(value.full_name)){
        error.full_name="Each name starts with a capital letter and is followed by lowercase letters"
    }else{
        error.full_name=""
    }

    if(value.date_of_birth===""){
        error.date_of_birth="Birth date should not be empty"
    }else if(!date_pattern.test(value.date_of_birth)){
        error.date_of_birth="Should be filled in mm/dd/yyyy format"
    }else{
        error.date_of_birth=""
    }

    if(value.role===""){
        error.role="Please choose a role"
    }
    else if(!validRoleOptions.includes(value.role)){
        error.role="Please choose a role"
    }else{
        error.role=""
    }

    if(value.role==="Admin"){
        if(!value.password.includes("Admin")){
            error.password="If you are an administractor, for you registering password , please make sure to include the word 'Admin' and you las  3 digits from your bank worker id "
        }
    }
    if(value.role==="Client"){
        if(value.password.includes("Admin")){
            error.password="Client password cannot contain the word 'Admin' "
        }
    }


    return error;
}

export default validation