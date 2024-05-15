"use strict"

async function renderApp() {
    const userId = JSON.parse(localStorage.getItem("user"));
    // Skicka en request till en av user.php
    // En GET request, med parametern userId med userId som värde
    // Skicka till State.get({
    //     entity: "user",
    //     rqst: "../api/user.php?userId=" + userId
    //})
    // const rqst = new Request ("api/users.php", {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(userId)
    // });

    // State.get({
    //     entity: "user",
    //     rqst: rqst
    // });
    
    if (!userId) {
        renderLoginContainer("wrapper");
    } else {
        renderFlashcards();
    }
}

renderApp();


