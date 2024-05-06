function renderAddFlashcardsButton(parentId) {
    const parent = document.getElementById(parentId);

    const flashcardsAddButton = document.createElement("button");
    flashcardsAddButton.classList.add("addFlashcardsButton");
    flashcardsAddButton.textContent = "+";

    flashcardsAddButton.addEventListener("click", (e) => {

    });

    parent.append(flashcardsAddButton);
}

function renderDeleteFlashcardsButton(parentId) {
    const parent = document.getElementById(parentId);

    const flashcardsDeleteButton = document.createElement("button");
    flashcardsDeleteButton.classList.add("deleteFlashcardsButton");
    flashcardsDeleteButton.textContent = "-";

    flashcardsDeleteButton.addEventListener("click", (e) => {

    });

    parent.append(flashcardsDeleteButton);
}

function renderSaveButton(parentId) {
    const parent = document.getElementById(parentId);

    const flashcardsSaveButton = document.createElement("button");
    flashcardsSaveButton.classList.add("saveButton");
    flashcardsSaveButton.textContent = "Save";

    flashcardsSaveButton.addEventListener("click", (e) => {

    });

    parent.append(flashcardsSaveButton);
};

renderContainerLeft("wrapper");
renderContainerRight("wrapper");