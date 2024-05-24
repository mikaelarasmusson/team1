"use strict"

function renderPlayFlashcardsContainer(parentId){
  const parent = document.getElementById(parentId);
  parent.innerHTML = null;
  const selfId = "playFlashcardsContainer";
  let dom = document.createElement("div");
  dom.id = selfId;

  parent.append(dom);

  renderSwitchFlashcardContainer(selfId);
  renderActiveFlashcardContainer(selfId);
}