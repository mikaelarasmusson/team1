"use strict"

async function renderApp() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;
    console.log(userId);

    if (!userId) {
        renderSigninUpContainer("wrapper");
        return; // avbryt ytterligare exekvering om ingen användare är inloggad
    }

    // Skapa en GET request för att hämta användarens flashcards
    const url = `../api/flashcards.php?userId=${userId}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        const flashcards = await response.json();
        console.log(flashcards);
        // Antag att du vill göra något med flashcards data här, kanske spara det eller direkt rendera det
        renderFlashcards(flashcards); // Antag att denna funktion tar flashcards data som argument
    } else {
        console.error("Failed to fetch flashcards");
        // Hantera fel, kanske visa ett felmeddelande
    }
}

renderApp();

// async function renderApp() {
//     const userId = JSON.parse(localStorage.getItem("user"));
//     // Skicka en request till en av user.php
//     // En GET request, med parametern userId med userId som värde
//     // Skicka till State.get({
//     //     entity: "user",
//     //     rqst: "../api/user.php?userId=" + userId
//     //})
//     // const rqst = new Request ("api/users.php", {
//     //     method: "GET",
//     //     headers: { "Content-Type": "application/json" },
//     //     body: JSON.stringify(userId)
//     // });

//     // State.get({
//     //     entity: "user",
//     //     rqst: rqst
//     // });
    
//     if (!userId) {
//         renderSigninUpContainer("wrapper");
//     } else {
//         renderFlashcards();
//     }
// }

// renderApp();


