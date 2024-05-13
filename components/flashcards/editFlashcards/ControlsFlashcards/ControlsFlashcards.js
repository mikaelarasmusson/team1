function renderAddFlashcardsButton(parentId) {
    const parent = document.getElementById(parentId);

    const flashcardsAddButton = document.createElement("button");
    flashcardsAddButton.classList.add("controlsButton");
    flashcardsAddButton.id = "flashcardsAddButton";
    flashcardsAddButton.textContent = "+";

    flashcardsAddButton.addEventListener("click", (e) => {
        renderEditActiveFlascardContainer(parentId);
    });

    parent.append(flashcardsAddButton);
}

function renderDeleteFlashcardsButton(parentId) {
    const parent = document.getElementById(parentId);

    const flashcardsDeleteButton = document.createElement("button");
    flashcardsDeleteButton.classList.add("controlsButton");
    flashcardsDeleteButton.id = "flashcardsDeleteButton";
    flashcardsDeleteButton.textContent = "-";

    flashcardsDeleteButton.addEventListener("click", (e) => {

    });

    parent.append(flashcardsDeleteButton);
}

function renderSaveButton(parentId) {
    const parent = document.getElementById(parentId);

    const flashcardsSaveButton = document.createElement("button");
    flashcardsSaveButton.classList.add("controlsButton");
    flashcardsSaveButton.id = "flashcardsSaveButton";
    flashcardsSaveButton.textContent = "Save";

    flashcardsSaveButton.addEventListener("click", (e) => {


    });

    parent.append(flashcardsSaveButton);
};

renderContainerLeft("wrapper");
renderContainerRight("wrapper");