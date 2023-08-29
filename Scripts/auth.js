// single page toggle

let authCont = document.querySelector(".container");
let loginBtn = document.querySelector("#log");
let signupBtn = document.querySelector("#reg");

loginBtn.addEventListener("click", () => {
  authCont.classList.add("container-visisble");
  document.title = "Login";
});
signupBtn.addEventListener("click", () => {
  authCont.classList.remove("container-visisble");
  document.title = "Signup";
});


// show error 
function showError(cls, message) {
  let ele = document.getElementsByClassName(cls)[0];
  ele.getElementsByClassName("err")[0].innerHTML = message;
}

// remove all errors
function removeErrors(cls){
    let errors=document.getElementsByClassName(cls);
    for(let err in errors){
        err.innerHTML="";
    }
}

// remove an error
function removeError(cls){
    let ele=document.getElementsByClassName(cls)[0];
    ele.getElementsByClassName("err")[0].innerHTML="";
}

// create hash for password

function hash(str, mul, add) {
  let n = str.length;
  let hash = 0;
  for (let i = 0; i < n; i++) {
    let char = mul * str.charCodeAt(i) + add;
    hash = hash + char;
  }
  return hash;
}

// form validation
function  validateForm(e,type) {
    e.preventDefault();
  const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  removeErrors("err");
    let flag = true;
    let email = document.querySelector(`#${type}-email`).value;
    let password=hash(document.querySelector(`#${type}-password`).value,5,10);
    // if email is not valid
    if (!emailRegex.test(email)) {
      showError(`${type}-email`, "Enter a valid Email address");
      flag = false;
    }

    // if password is weak
    if (!validatePassword(`${type}-password`)) {
      showError(`${type}-password`, `Password should be a combination of uppercase letters,<br> lowercase letters, numbers, and symbols (atleast 8 chars)`);
      flag = false;
    }
    // if name is not valid (only while registering)
    if(type=="reg"){
        let name=document.querySelector("#reg-name").value;
        let nameRegex = /^[A-Za-z\s]+$/;
        if(!nameRegex.test(name) || name.length<3){
            showError("reg-name","Enter a valid Name!");
            flag=false;
        }
        if(flag){
          
            flag=addUser({ name, email, password });
            return flag;
        }
    }

    if(flag){
        verifyUser(email,password);
    }

    return flag;
}


//validate password

function validatePassword(id){
    let flag=true;
    let password = document.getElementById(id).value;
    let strongPassRegex=/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
      if(!strongPassRegex.test(password)){
        showError(id, `Password should be a combination of uppercase letters,<br> lowercase letters, numbers, and symbols (atleast 8 chars)`);
        flag=false;
      }
      else{
        removeError(id);
      }
      return flag;
}
