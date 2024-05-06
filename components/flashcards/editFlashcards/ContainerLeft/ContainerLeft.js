function renderContainerLeft(parentId) {
    const parent = document.getElementById(parentId);
    const selfId = "container-left";
    let dom = document.createElement("div");
    dom.id = selfId;

    parent.append(dom);

    renderSaveButton(selfId);
    renderAddFlashcardsButton(selfId);
    renderDeleteFlashcardsButton(selfId);
}