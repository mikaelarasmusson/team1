"use strict"

function renderContainerRight(parentId) {
    const parent = document.getElementById(parentId);
    const selfId = "container-right";
    let dom = document.createElement("div");
    dom.id = selfId;

    parent.append(dom);

    renderEditActiveFlascardContainer(selfId);
}


