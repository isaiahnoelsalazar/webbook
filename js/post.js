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
                document.getElementsByClassName("content-community-add-title")[0].innerHTML = "Create new post for " + details[0] + " " + details[1];
            }
        }
    }
    requestDetails.send();
};
function post(){
    let requestPost = new XMLHttpRequest();
    requestPost.open("POST", `https://sasasaia.pythonanywhere.com/post?postcontent=${document.getElementById("post-content").value}`, true);
    requestPost.withCredentials = true;
    requestPost.onreadystatechange = function (){
        if (requestPost.status == 200 && requestPost.readyState == 4){
            let response = requestPost.responseText;
            if (response == "Success"){
                window.location.href = "index.html";
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
    requestPost.send();
}