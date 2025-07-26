function login(){
    let requestLogin = new XMLHttpRequest();
    requestLogin.open("GET", `https://sasasaia.pythonanywhere.com/login?username=${document.getElementById("username").value}&password=${document.getElementById("password").value}`, true);
    requestLogin.withCredentials = true;
    requestLogin.onreadystatechange = function (){
        if (requestLogin.status == 200 && requestLogin.readyState == 4){
            let response = requestLogin.responseText;
            if (response == "Success"){
                window.location.href = "webbook.html";
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
    requestLogin.send();
}