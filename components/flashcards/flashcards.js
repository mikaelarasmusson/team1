"use strict"

async function renderFlashcards() {
    const userId = JSON.parse(localStorage.getItem("user"));
    
    const flashcardData = {
        entity: "flashcards",
        userId: userId,
        rqst: "../../api/flashcards.php"
    }

    // const userFlashcards = await getUserFlashcards(userId["id"]);
    // localStorage.setItem("userFlashcards", JSON.stringify(userFlashcards));

    await State.get(flashcardData);
    renderNavBar("navbar");
    renderFlashcardBoxes();
}

// async function getUserFlashcards(userId) {
//     const response = await fetch("your_api_endpoint", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             action: "getUserFlashcards",
//             userId: userId
//         })
//     });
// }

function renderFlashcardBoxes () {
    const parentDom = document.getElementById("wrapper");
    parentDom.innerHTML = null;
    const flashcards = State.getEntity("flashcards");
    parentDom.innerHTML = `
    <div id="myflashcards">
        <h1 id="page-title">My Flashcards</h1>
        <div class="flashcard-container"></div>
    </div>
    `;

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
                userId: userId,
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
            
        });

        cardBox.addEventListener("click", (e) => {
            State.saveEntity("deckIdChoice", flashcard.id);
            renderPlayFlashcardsContainer("wrapper");
        });

        parentDom.querySelector(".flashcard-container").append(cardBox);
    }
}

function getFlashcardDomId (instanceId) {
    return `flashcardbox-${instanceId}`;
}

function deleteFlashcardBox (id) {
    const domId = getFlashcardDomId(id);
    const dom = document.getElementById(domId);
    dom.remove();
}

renderFlashcards();
