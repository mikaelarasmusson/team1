function renderAddFlashcardsButton(parentId) {
    const parent = document.getElementById(parentId);

    const flashcardsButton = document.createElement("button");
    flashcardsButton.classList.add("add_flashcards_button");
    flashcardsButton.textContent = "+";



    albumsButton.addEventListener("click", (e) => {

    });
}

function renderDeleteFlashcardsButton(parentId) {
    const parent = document.getElementById(parentId);

    const flashcardsButton = document.createElement("button");
    flashcardsButton.classList.add("delete_flashcards_button");
    flashcardsButton.textContent = "-";



    albumsButton.addEventListener("click", (e) => {

    });

    parent.append(add_flashcards_button);
    parent.append(delete_flashcards_button);
}

function renderSaveButton(parentId) {
    const parent = document.getElementById(parentId);

    const flashcardsButton = document.createElement("button");
    flashcardsButton.classList.add("save_button");
    flashcardsButton.textContent = "Save";

    SaveButton.addEventListener("click", (e) => {

    });
};