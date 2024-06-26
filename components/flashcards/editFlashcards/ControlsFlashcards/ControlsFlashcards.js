"use strict"

let allAddedCards = [];

function renderAddFlashcardsButton(parentId) {
    const parent = document.getElementById(parentId);

    const flashcardsAddButton = document.createElement("button");
    flashcardsAddButton.classList.add("controlsButton");
    flashcardsAddButton.id = "flashcardsAddButton";
    flashcardsAddButton.textContent = "+";

    flashcardsAddButton.addEventListener("click", (e) => {
        const questionInput = document.getElementById("questionInput").value;
        const answerInput = document.getElementById("answerInput").value;

        if (questionInput === "" || answerInput === "") {
            document.getElementById("error").textContent = "No field should be empty"
            return;
        }

        let highestId = 0;

        for (let card of allAddedCards) {
            if (card.questionId > highestId) highestId = card.questionId;
        }

        allAddedCards.push({
            questionId: ++highestId,
            question: questionInput,
            answer: answerInput
        });

        document.getElementById("questionInput").value = "";
        document.getElementById("answerInput").value = "";

        console.log(allAddedCards);
    });

    parent.append(flashcardsAddButton);
}

function renderSaveButton(parentId) {
    const parent = document.getElementById(parentId);
    const flashcardsSaveButton = document.createElement("button");
    flashcardsSaveButton.classList.add("controlsButton");
    flashcardsSaveButton.id = "flashcardsSaveButton";
    flashcardsSaveButton.textContent = "Save";

    flashcardsSaveButton.addEventListener("click", async (e) => {
        const subjectInput = document.getElementById("subjectInput").value;
        if (subjectInput === "") {
            document.getElementById("error").textContent = "Needs a subject";
            return;
        }
        if (allAddedCards.length === 0) {
            document.getElementById("error").textContent = "No cards added, you must add at least one card";
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user ? user.id : null;

        if (!userId) {
            document.getElementById("error").textContent = "You must be logged in to save flashcards.";
            return;
        }

        const flashcardData = {
            userId: userId,
            subject: subjectInput,
            questions: allAddedCards
        };

        const rqst = new Request("./api/flashcards.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(flashcardData)
        });

        State.post({
            entity: "flashcards",
            rqst: rqst
        });

        allAddedCards = [];
    });

    parent.append(flashcardsSaveButton);
};
