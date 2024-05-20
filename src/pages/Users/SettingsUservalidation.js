function validation(value) {
    let error = {};
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const otp_pattern = /^\d{4}$/;
    const question_pattern = /.+?\?$/;
  
    if (value.username === '') {
      error.username = "Username field must not be empty";
    } else {
      error.username = "";
    }
  
    if (value.password === "") {
      error.password = "Password should not be empty";
    } else if (!password_pattern.test(value.password)) {
      error.password = "The password must contain at least one digit, one lowercase letter, one uppercase letter, and is at least 8 characters long, with no spaces or special characters allowed.";
    } else if (value.password !== value.confirmpassword) {
      error.password = "The passwords must match";
    } else {
      error.password = "";
    }
  
    if (value.confirmpassword === "") {
      error.confirmpassword = "Confirm Password should not be empty";
    } else if (!password_pattern.test(value.confirmpassword)) {
      error.confirmpassword = "The password must contain at least one digit, one lowercase letter, one uppercase letter, and is at least 8 characters long, with no spaces or special characters allowed.";
    } else if (value.password !== value.confirmpassword) {
      error.confirmpassword = "The passwords must match";
    } else {
      error.confirmpassword = "";
    }
  
    if (value.email === "") {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(value.email)) {
      error.email = "Email format is invalid";
    } else {
      error.email = "";
    }
  
    if (value.otp === "") {
      error.otp = "OTP should not be empty";
    } else if (!otp_pattern.test(value.otp)) {
      error.otp = "OTP should be a 4-digit number";
    } else {
      error.otp = "";
    }
  
    const trimmedQuestion = value.question.trim();
    if (trimmedQuestion === "") {
      error.question = "Question should not be empty";
    } else if (!question_pattern.test(trimmedQuestion)) {
      error.question = "The sentence must be a question";
    } else {
      error.question = "";
    }
  
    const trimmedAnswer = value.answer.trim();
    if (trimmedAnswer === "") {
      error.answer = "Answer should not be empty";
    } else {
      error.answer = "";
    }

    if(value.pin===""){
        error.pin = "PIN should not be empty";
    }else if(value.pin !== value.confirmpin){
        error.pin ="the pins should match"
    }
    else{
      error.pin=""
    }
  
    if(value.confirmpin===""){
        error.confirmpin="This should not be empty"
    }else if(value.pin !== value.confirmpin){
        error.confirmpin ="the pins should match"
    }else{
      error.confirmpin = "";
    }

    return error;
  }
  
  export default validation;
  