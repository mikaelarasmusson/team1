"use strict"

async function renderApp() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;
    console.log(userId);

    if (!userId) {
        renderSigninUpContainer("wrapper");
        return; 
    }

    const url = `./api/flashcards.php?userId=${userId}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        //const flashcards = await response.json();
        //console.log(flashcards);
        window.location = "./flashcards.html";
        //renderFlashcards(flashcards); 
    } else {
        console.error("Failed to fetch flashcards");
    }
}

renderApp();


