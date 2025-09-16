function register(){
    let requestRegister = new XMLHttpRequest();
    requestRegister.open("POST", `https://sharenetarchive1.pythonanywhere.com/register?fname=${document.getElementById("fname").value}&lname=${document.getElementById("lname").value}&username=${document.getElementById("username").value}&password=${document.getElementById("password").value}`, true);
    requestRegister.onreadystatechange = function (){
        if (requestRegister.status == 200 && requestRegister.readyState == 4){
            let response = requestRegister.responseText;
            if (response == "Success"){
                window.location.href = "login.html";
            } else {
                let main = document.getElementById("main");
                let p = document.createElement("p");
                p.id = "context-dialog";
                p.innerHTML = response;
                main.appendChild(p);
                setTimeout(function (){
                    main.removeChild(p);
                }, 5000);
            }
        }
    }
    requestRegister.send();
}