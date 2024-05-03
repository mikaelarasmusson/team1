function renderContainerFlashcards(parentId, flashcards) {
    const parent = document.createElement("div");
    const selfId = "container-flashcards";

    let dom = document.createElement("div");
    dom.id = selfId;
    dom.classList.add("container-flashcard");

    parent.append(dom);

    renderFlashcardsList();

    // async function UpdateUI i state för att alla deckar som hämtas ska kunna dycka upp på sidan? 
    //lägg till ny flashcarddeck på sidan?
    const postFlashcard = {
        //token: TOKEN,
        id: numId
    }

    //skapar post request
    const request = new Request("../API/flashcards.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postFlashcard)
    });


}

function renderFlashcardsList(parentId) {
    const artists = State.get("flashcards");
    const parent = document.getElementById(parentId);
    const selfId = "flashcards-list";
    const divDom = document.createElement("div");
    divDom.id = selfId;

    parent.append(ulDom);

    flashcards.forEach(flashcards => {
        renderFlashcards(selfId, flashcards);
    });
}


function get(flashcards) {
    const copy = JSON.parse(JSON.stringify(_state[flashcards]));
    return copy;
}

