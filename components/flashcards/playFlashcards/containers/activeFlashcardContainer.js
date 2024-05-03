function renderActiveFlashcardContainer(parentId){
  const parent = document.getElementById(parentId);
  const selfId =  'activeFlashcardContainer';
  let dom = document.createElement('div');
  dom.id = selfId;

  dom.classList.add('activeFlashcards');

  parent.append(dom);

  //renderFlashcardInformation(selfId);
}