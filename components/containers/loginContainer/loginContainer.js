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
        <p>Don't have an account? Sign up <a href="#"></a>here</p>
    `;

    //parent.innerHTML = "";
    parent.append(dom);
}