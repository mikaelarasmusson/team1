function renderSwitchFlashcardContainer(parentId){
  const parent = document.getElementById(parentId);
  const selfId =  "switchFlashcardContainer";
  let dom = document.createElement("div");
  dom.id = selfId;

  dom.classList.add("switchFlashcard");

  parent.append(dom);

  //renderSwitchFlashcard(selfId);
}