"use strict"

async function renderFlashcards() {
    const flashcardData = {
        entity: "flashcards",
        rqst: "../../api/flashcards.php"
    }

    await State.get(flashcardData);
    renderNavBar("navbar");
    renderFlashcardBoxes();
}

function renderFlashcardBoxes () {
    const parentDom = document.getElementById("wrapper");
    parentDom.innerHTML = null;
    const flashcards = State.getEntity("flashcards");
    const pageTitle = document.createElement("h1");
    pageTitle.classList.add("page-title");
    pageTitle.textContent = "My Flashcards";
    const flashcardContainer = document.createElement("div");
    flashcardContainer.classList.add("flashcard-container");
    parentDom.append(pageTitle, flashcardContainer);

    for (const flashcard of flashcards) {
        const cardBox = document.createElement("div");
        const selfId = `flashcardbox-${flashcard.id}`;
        cardBox.id = selfId;
        cardBox.classList.add("flashcard-box");

        cardBox.innerHTML = `
        <p>${flashcard.subject}</p>
        <button class="delete-button"></button>
        `;

        cardBox.querySelector(".delete-button").addEventListener("click", (e) => {
            e.stopPropagation();
            const userId = JSON.parse(localStorage.getItem("user"));

            const deleteData = {
                userId: 1,
                id: flashcard.id,
            }
        
            const rqst = new Request ("../../api/flashcards.php", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(deleteData)
            });
        
            State.Delete({
                entity: "flashcards",
                rqst: rqst
            });
            
        })

        cardBox.addEventListener("click", (e) => {
            State.saveEntity("deckIdChoice", flashcard.id);
            renderPlayFlashcardsContainer("wrapper");
            // spara undan informationen i state
        })

        // En delete-knapp med ett event för att kunna ta bort
        // Samma som U2.
        flashcardContainer.append(cardBox);
    }

}

function getFlashcardDomId (instanceId) {
    return `flashcardbox-${instanceId}`;
}

// En delete funktion som uppdaterar state.
function deleteFlashcardBox (id) {
    const domId = getFlashcardDomId(id);
    const dom = document.getElementById(domId);
    dom.remove();
}

renderFlashcards();
