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

    
function login(email,password) {
    
    fetch("https://65523ba35c69a7790329bd14.mockapi.io/store")
    .then(response => response.json())
    .then(data=>{
        data.forEach(element => {
            console.log(element.email);
            if (password === element.password && element.email === email) {
                console.log(element);
                stringg = "نورتنا!"
                showToastlogin(stringg);
                
        displayBooks();
               
            }else{
                stringg = "خطأ في تسجيل الدخول"
                showToastlogin(stringg)
            }
            if (element.email==="aa1@gmail.com") {
                const admin = true
                
            }
        });
        
    })
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

