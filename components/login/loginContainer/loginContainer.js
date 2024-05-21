"use strict"
// Ta bort container och använd bara login
function renderLoginContainer (parentId) {
    const parent = document.getElementById(parentId);
    const selfId = "login-container";
    let dom = document.createElement("div");
    dom.id = selfId;
    dom.innerHTML = `
        <h2>UniConnect</h2>
        <img src="../images/LilacLogotype.jpg" alt="logotype">
        <input type="text" id="username" placeholder="Username:">
        <input type="password" id="password" placeholder="Password:">
        <button id="login">Login</button>
        <p>Don't have an account? Sign up <a id="register" href="#">here</a></p>
        <p>Have you forgotten your password? Change <a id="change-password" href="#">here</a></p>
    `;

    //Forgotten password med patch
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

//register.php och fixa en register funktion



