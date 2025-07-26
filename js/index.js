let uid = "";
window.onload = function (){
    homeclick();
    let requestSession = new XMLHttpRequest();
    requestSession.open("GET", "https://sasasaia.pythonanywhere.com/session", true);
    requestSession.withCredentials = true;
    requestSession.onreadystatechange = function (){
        if (requestSession.status == 200 && requestSession.readyState == 4){
            let response = requestSession.responseText;
            if (response == "Not logged in."){
                window.location.href = "login.html";
            } else {
                uid = response.split("[sprtr_str]")[1];
                getPosts();
            }
        }
    }
    requestSession.send();
};
function getPosts(){
    let requestAllPosts = new XMLHttpRequest();
    requestAllPosts.open("GET", "https://sasasaia.pythonanywhere.com/get-posts", true);
    requestAllPosts.withCredentials = true;
    requestAllPosts.onreadystatechange = function (){
        if (requestAllPosts.status == 200 && requestAllPosts.readyState == 4){
            let response = requestAllPosts.responseText;
            if (response == "Not logged in."){
                window.location.href = "login.html";
            } else {
                let allposts = response.split("[nln_str]");
                allposts.reverse();
                allposts.forEach(one_post => {
                    if (one_post.length > 0){
                        let contentHomePost = document.createElement("div");
                        let contentHomePostAuthor = document.createElement("h3");
                        let contentHomePostContent = document.createElement("div");
                        let contentHomePostContentP = document.createElement("p");
                        let contentHomePostLine = document.createElement("div");
                        let contentHomePostStarContainer = document.createElement("div");
                        let contentHomePostStarContainerImg = document.createElement("img");

                        contentHomePost.classList = "content-home-post";
                        contentHomePostAuthor.classList = "content-home-post-author";
                        contentHomePostAuthor.innerHTML = one_post.split("[sprtr_str]")[1];
                        contentHomePostContentP.innerHTML = one_post.split("[sprtr_str]")[2];
                        contentHomePostContent.classList = "content-home-post-content";
                        contentHomePostContent.appendChild(contentHomePostContentP);
                        contentHomePostLine.classList = "content-home-post-line";
                        contentHomePostStarContainer.classList = "content-home-post-starcontainer";
                        contentHomePostStarContainer.onclick = function (){
                            let requestStar = new XMLHttpRequest();
                            requestStar.open("POST", `https://sasasaia.pythonanywhere.com/star-post/${one_post.split("[sprtr_str]")[0]}`, true);
                            requestStar.withCredentials = true;
                            requestStar.onreadystatechange = function (){
                                if (requestStar.status == 200 && requestStar.readyState == 4){
                                    let thisresponse = requestStar.responseText;
                                    if (thisresponse == "Not logged in."){
                                        window.location.href = "login.html";
                                    } else {
                                        if (thisresponse.split("[sprtr_str]")[0] == "Success"){
                                            contentHomePostStarContainerImg.src = thisresponse.split("[sprtr_str]")[1];
                                        }
                                    }
                                }
                            }
                            requestStar.send();
                        };
                        let starredUids = one_post.split("[sprtr_str]")[3].substring(1, one_post.split("[sprtr_str]")[3].length - 1).split(",");
                        contentHomePostStarContainerImg.src = !starredUids.includes(uid) ? "resources/star_filled.png" : "resources/star.png";
                        contentHomePostStarContainer.appendChild(contentHomePostStarContainerImg);
                        contentHomePost.appendChild(contentHomePostAuthor);
                        contentHomePost.appendChild(contentHomePostContent);
                        contentHomePost.appendChild(contentHomePostLine);
                        contentHomePost.appendChild(contentHomePostStarContainer);
                        document.getElementById("content-home").appendChild(contentHomePost);
                    }
                });
            }
        }
    }
    requestAllPosts.send();
}
function newpost(){
    window.location.href = "post.html";
}
function followuser(){
    let requestFollow = new XMLHttpRequest();
    requestFollow.open("POST", `https://sasasaia.pythonanywhere.com/add-friend/${document.getElementById("follow-user-input").value}`, true);
    requestFollow.withCredentials = true;
    requestFollow.onreadystatechange = function (){
        if (requestFollow.status == 200 && requestFollow.readyState == 4){
            let response = requestFollow.responseText;
            if (response == "Not logged in."){
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
    requestFollow.send();
}
function homeclick(){
    document.getElementById("hometab").classList.remove("unselected");
    document.getElementById("hometab").classList.add("selected");
    document.getElementById("hometab").src = "resources/home_white.png";
    document.getElementById("communitytab").classList.remove("selected");
    document.getElementById("communitytab").classList.add("unselected");
    document.getElementById("communitytab").src = "resources/community.png";

    document.getElementById("content-home").style.display = "flex";
    document.getElementById("content-community").style.display = "none";
    if (document.getElementById("dropdowncard").style.display == "flex"){
        document.getElementById("dropdowncard").style.display = "none";
        document.getElementById("dropdownback").style.display = "none";
    }
    if (document.getElementById("navmenu").style.display == "flex"){
        document.getElementById("navmenu").style.display = "none";
        document.getElementById("navmenuback").style.display = "none";
    }
}
function communityclick(){
    document.getElementById("hometab").classList.remove("selected");
    document.getElementById("hometab").classList.add("unselected");
    document.getElementById("hometab").src = "resources/home.png";
    document.getElementById("communitytab").classList.remove("unselected");
    document.getElementById("communitytab").classList.add("selected");
    document.getElementById("communitytab").src = "resources/community_white.png";

    document.getElementById("content-home").style.display = "none";
    document.getElementById("content-community").style.display = "flex";
    if (document.getElementById("dropdowncard").style.display == "flex"){
        document.getElementById("dropdowncard").style.display = "none";
        document.getElementById("dropdownback").style.display = "none";
    }
    if (document.getElementById("navmenu").style.display == "flex"){
        document.getElementById("navmenu").style.display = "none";
        document.getElementById("navmenuback").style.display = "none";
    }
}
function edit_account(){
    if (document.getElementById("dropdowncard").style.display == "flex"){
        document.getElementById("dropdowncard").style.display = "none";
        document.getElementById("dropdownback").style.display = "none";
    } else {
        document.getElementById("dropdowncard").style.display = "flex";
        document.getElementById("dropdownback").style.display = "block";
    }
}
function dropback(){
    if (document.getElementById("dropdowncard").style.display == "flex"){
        document.getElementById("dropdowncard").style.display = "none";
        document.getElementById("dropdownback").style.display = "none";
    }
}
function account_details(){
    window.location.href = "account_details.html";
}
function logout(){
    let requestLogout = new XMLHttpRequest();
    requestLogout.open("GET", "https://sasasaia.pythonanywhere.com/logout", true);
    requestLogout.withCredentials = true;
    requestLogout.onreadystatechange = function (){
        if (requestLogout.status == 200 && requestLogout.readyState == 4){
            let response = requestLogout.responseText;
            if (response == "Success"){
                window.location.href = "login.html";
            }
        }
    }
    requestLogout.send();
}
function menubtnclick(){
    if (document.getElementById("navmenu").style.display == "flex"){
        document.getElementById("navmenu").style.display = "none";
        document.getElementById("navmenuback").style.display = "none";
    } else {
        document.getElementById("navmenu").style.display = "flex";
        document.getElementById("navmenuback").style.display = "block";
    }
}
function navback(){
    if (document.getElementById("navmenu").style.display == "flex"){
        document.getElementById("navmenu").style.display = "none";
        document.getElementById("navmenuback").style.display = "none";
    }
}