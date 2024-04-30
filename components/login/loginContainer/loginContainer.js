"use strict"

function renderLoginContainer (parentId) {
    const parent = document.getElementById(parentId);
    const selfId = "login-container";
    let dom = document.createElement("div");
    dom.id = selfId;
    dom.innerHTML = `
        <h2>UniConnect</h2>
        <img src="../images/LilacLogotype.jpg" alt="logotype">
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <button id="login">Login</button>
        <p>Don't have an account? Sign up <a id="register" href="#">here</a></p>
    `;

    //parent.innerHTML = "";
    parent.append(dom);

    document.getElementById("login").addEventListener("click", requestLogin);

    document.getElementById("register").addEventListener("click", (e) => {
        renderRegisterContainer("wrapper");
    });
}

function requestLogin (event) {
    console.log(event);
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

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



