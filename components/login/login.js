"use strict"
// Ta bort container och använd bara login
function renderSigninUpContainer (parentId) {
    const parent = document.getElementById(parentId);
    const selfId = "login-container";
    let dom = document.createElement("div");
    dom.id = selfId;
    dom.innerHTML = `
        <h2>UniConnect</h2>
        <img src="../images/LilacLogotype.jpg" alt="logotype">
        <input type="text" id="username" placeholder="Username:">
        <input type="password" id="password" placeholder="Password:">
        <div id="buttontext"></div> 
        `;
        
        //Forgotten password med patch
        //parent.innerHTML = "";
    parent.append(dom);
    renderLogin();
}

function renderLogin () {
    document.getElementById("buttontext").innerHTML = `
    <button id="login">Login</button>
    <p>Don't have an account? Sign up <a id="toregister" href="#">here</a></p>
    <p>Forgot password? Change <a id="changePassword" href="#">here</a></p>
    `;

    document.getElementById("login").addEventListener("click", requestLogin);

    document.getElementById("changePassword").addEventListener("click", () => {
        //Ändra lösenord
        //Dialog ruta med 2 input - currentUser och newPassword
        //Skicka till patch för att ändra lösenordet
    });
    
    document.getElementById("toregister").addEventListener("click", (e) => {
        renderRegister();
    });
}

function requestLogin (event) {
    console.log(event);
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // kontroller för inloggfälten, så det ej är tomma osv

    const loginData = {
        username: username,
        password: password
    }

    const rqst = new Request ("../api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
    });

    State.LoginRegister({
        type: "Login",
        entity: "user",
        rqst: rqst
    });
}

function renderRegister() {
    document.getElementById("buttontext").innerHTML = `
    <button id="register">Register</button>
    <p id="registermessage">Already a user?</p> <p>Sign in <a id="tologin" href="#">here</a></p>
    `;

    document.getElementById("register").addEventListener("click", requestRegister);
    
    document.getElementById("tologin").addEventListener("click", (e) => {
        renderLogin();
    });
}

function requestRegister (event) {
    console.log(event);
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // kontroller för inloggfälten, så det ej är tomma osv

    const loginData = {
        username: username,
        password: password
    }

    const rqst = new Request ("../api/users.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
    });

    State.LoginRegister({
        type: "Register",
        entity: "user",
        rqst: rqst
    });
}


