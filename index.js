"use strict"

async function renderApp() {

    const userId = JSON.parse(localStorage.getItem("user"));
    // Skicka en request till en av user.php
    // En GET request, med parametern userId med userId som värde
    // Skicka till State.get({
    //     entity: "user",
    //     rqst: "../api/user.php?userId=" + userId
    //})
    if (userId) {
    renderDashboard("wrapper");
    } else {
    renderLoginContainer("wrapper");
    }

    
}

renderDashboard ()


