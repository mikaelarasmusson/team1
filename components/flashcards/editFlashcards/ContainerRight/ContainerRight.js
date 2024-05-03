function renderContainerRight(parentId) {
    const parent = document.getElementById(parentId);
    const selfId = "container-right";
    let dom = document.createElement("div");
    dom.id = selfId;

    const deckTitel = document.CreateElement("div");
    deckTitel.classList.add("deck_titel");
    deckTitel.textContent = "DU1";

    const deck_username = document.CreateElement("div");
    deck_username.classList.add("deck_titel");
    deck_username.textContent = "Sabi13";

    parent.append(dom);

    renderContainerFlahcards(selfId);
    renderSwitchFlahcardContainer(selfId);

}


