function renderActiveFlashcardContainer(parentId){
  const parent = document.getElementById(parentId);
  const selfId =  'activeFlashcardContainer';
  let dom = document.createElement('div');
  dom.id = selfId;

  const deckTitle = document.createElement("div");
  deckTitle.classList.add("deckTitle");
  deckTitle.textContent = "DU1";

  const deckUsername = document.createElement("div");
  deckUsername.classList.add("deckUsername");
  deckUsername.textContent = "Sabi13";

  dom.classList.add('activeFlashcards');

  parent.append(dom);

  //renderFlashcardInformation(selfId);
}