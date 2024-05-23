"use strict"
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
    let dialog = document.createElement("dialog");
    dialog.id = 'popup';
    dialog.innerHTML = `
        <p id="changeMessage"></p>
        <input type="text" id="usernameChange" placeholder="Username:">
        <input type="password" id="passwordChange" placeholder="New Password">
        <button id="changeBtn">Change</button> 
        <button id="back">Back</button> 
        `;
    
    dialog.querySelector('#back').addEventListener('click', () => dialog.close())
    dialog.querySelector('#changeBtn').addEventListener('click', () => {
        const username = dialog.querySelector("#usernameChange").value;
        const password = dialog.querySelector("#passwordChange").value;

        const changeData = {
            username: username,
            password: password,
        }
    
        const rqst = new Request ("./api/login.php", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(changeData)
        });
    
        State.patch({
            entity: "user",
            rqst: rqst
        });
    })
        
    parent.append(dom);
    parent.append(dialog);
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
        const dialog = document.getElementById('popup')
        dialog.showModal();
    });
    
    document.getElementById("toregister").addEventListener("click", (e) => {
        renderRegister();
    });
}

function requestLogin (event) {
    console.log(event);
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (username === "") {
        document.getElementById("error").textContent = "Needs a username";
        return;
    }

    if (password === "") {
        document.getElementById("error").textContent = "Needs a password";
        return;
    }

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

    if (username === "") {
        document.getElementById("error").textContent = "Needs a username";
        return;
    }

    if (password === "") {
        document.getElementById("error").textContent = "Needs a password";
        return;
    }

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


