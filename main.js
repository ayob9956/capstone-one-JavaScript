let sign_up = document.getElementById('sign-in')


var stringg ;




sign_up.addEventListener('click', function(e) {
    e.preventDefault();
    
    let name = document.getElementById('name-register').value;
    let password = document.getElementById('password-register').value;
    let email = document.getElementById('email-register').value;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if (name.length < 5) {
        stringg = "يلزم الاسم اكثر من 5 احرف";
        showToastregester(stringg);
        console.log(stringg);
    } 
    else if (password.length < 8) {
        stringg = "يلزم كلمة مرور اكثر من 8 عناصر";
        showToastregester(stringg);
        console.log(stringg);
    }
    else if (!emailRegex.test(email)) {
        stringg = "خطأ في  صيغة الإيميل";
        showToastregester(stringg);
        console.log(stringg);
    }
    else {
        registeretion(name,password,email);
    }
});
 

function registeretion(name,password,email) {

    fetch('https://65523ba35c69a7790329bd14.mockapi.io/store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name, 
            password, 
            email}),
    })
    .then(response => response.json())
    .then(() => {
        
        stringg = "تم تسجيل المستخدم بنجاح!"
        showToastregester(stringg);
      
    })
    .catch(() => {
        stringg = "خطأ في تسجيل المستخدم"
        showToastregester(stringg)
        
    });
    
}


// second function for log in!



let loginbtn = document.getElementById("login-btn");

loginbtn.addEventListener("click",function () {
    let emailLog = document.getElementById("emil-login").value;
    let passLog = document.getElementById("pass-Login").value;

    console.log(passLog);
    console.log(emailLog);
    login(emailLog,passLog);
    
})

if (localStorage.getItem("user")) {
    let nav = document.getElementById("main-nav")
    let btn1 = document.getElementById("sig")
    let btn2 = document.getElementById("log")
    console.log(btn1);
    if (btn1) btn1.className = 'hide'; 
    console.log(btn1);
    if (btn2) btn2.className = 'hide';
    let btn3 = document.createElement("button")
    // btn1.remove();
    // btn2.remove();
    btn3.innerText = "تسجيل خروج";
    btn3.id = "logout"; // Assign an ID to the logout button for later use
    btn3.onclick = logout; // Assign the logout function to the onclick handler
    btn3.className="btn btn-outline-light mx-2"

    // Append the logout button to the navigation
    nav.appendChild(btn3);

}
    
function login(email, password) {
    fetch("https://65523ba35c69a7790329bd14.mockapi.io/store")
    .then(response => response.json())
    .then(data => {
        let loginSuccessful = false;
        let isAdmin = false;
        
        let nav = document.getElementById("main-nav")
        let btn1 = document.getElementById("sig")
        let btn2 = document.getElementById("log")

        for (const element of data) {
            console.log(localStorage.getItem("user"));
              if (password === element.password && email === element.email) {
                loginSuccessful = true;
                isAdmin = element.email === "aa1@gmail.com"; 
                localStorage.setItem('user', JSON.stringify({ email: element.email, isAdmin: isAdmin }));
                showToastlogin("نورتنا!");
                console.log(loginSuccessful);
                if (loginSuccessful) {
                    if (btn1) btn1.className = 'hide'; 
                    console.log(btn1);
                    if (btn2) btn2.className = 'hide';
                    let btn3 = document.createElement("button")
                    // btn1.remove();
                    // btn2.remove();
                    btn3.innerText = "تسجيل خروج";
                    btn3.id = "logout"; // Assign an ID to the logout button for later use
                    btn3.onclick = logout; // Assign the logout function to the onclick handler
                    btn3.className="btn btn-outline-light mx-2"

                    // Append the logout button to the navigation
                    nav.appendChild(btn3);

                }
                break; // Stop the loop if user is found
            }
            
            else if (!loginSuccessful) {
                showToastlogin("خطأ في تسجيل الدخول");
            }
        }
    })
    .catch(error => {
        console.error('Login Error:', error);
    });
} 
function showToastlogin(stringg) {
    var toast = document.getElementById("toast");
    toast.className = "show";
    toast.style.color = "red"
    toast.innerText = stringg;
    console.log(stringg);
    setTimeout(function(){
         toast.className = toast.className.replace("show", ""); }, 3000);
}
function showToastregester(stringg) {
    var toast = document.getElementById("toast1");
    toast.className = "show";
    toast.style.color = "red"
    toast.innerText = stringg;
    
    setTimeout(function(){
         toast.className = toast.className.replace("show", ""); }, 100);
}



function logout() {
   
    localStorage.removeItem('user');

    // Redirect to login page or refresh the page to reflect the logout state
  window.location.href = 'index.html'; 

    // If you have any client-side state to clear, do it here
    // For example, clear any displayed user information
}

