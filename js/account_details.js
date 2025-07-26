window.onload = function (){
    let requestDetails = new XMLHttpRequest();
    requestDetails.open("GET", "https://sasasaia.pythonanywhere.com/details", true);
    requestDetails.withCredentials = true;
    requestDetails.onreadystatechange = function (){
        if (requestDetails.status == 200 && requestDetails.readyState == 4){
            let response = requestDetails.responseText;
            if (response == "Not logged in."){
                window.location.href = "login.html";
            } else {
                let details = response.split("[sprtr_str]");
                document.getElementById("fname").value = details[0];
                document.getElementById("lname").value = details[1];
                document.getElementById("username").value = details[2];
                document.getElementById("password").value = details[3];
            }
        }
    }
    requestDetails.send();
};
function save(){
    let requestSave = new XMLHttpRequest();
    requestSave.open("POST", `https://sasasaia.pythonanywhere.com/save?fname=${document.getElementById("fname").value}&lname=${document.getElementById("lname").value}&username=${document.getElementById("username").value}&password=${document.getElementById("password").value}`, true);
    requestSave.withCredentials = true;
    requestSave.onreadystatechange = function (){
        if (requestSave.status == 200 && requestSave.readyState == 4){
            let response = requestSave.responseText;
            if (response == "Success"){
                let main = document.getElementById("main");
                let p = document.createElement("p");
                p.id = "context-dialog";
                p.innerHTML = "Successfully saved changes.";
                main.appendChild(p);
                setTimeout(function (){
                    main.removeChild(p);
                }, 5000);
                //window.location.href = "webbook.html";
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
    requestSave.send();
}
function back(){
    window.history.back();
}