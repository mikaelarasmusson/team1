function renderFlashcardsInput(parentId, flashcards){
  const parent = document.getElementById(parentId);

}

const postButton = document.getElementById("postButton");

postButton.addEventListener('click', () => {

  const postData = {
   token: '6671cb1c4aeeb7b2bf6d7474b28296b199bdd568',
   name: inputInstance.value,
   rating: +select.value,
   favorite: false,
 }

 const request = new Request(`./api/FLASHCARDS.json`, {
   method: 'POST',
   headers: { "Content-type": 'application/json' },
   body: JSON.stringify(postData)
 })

 const newItem = { 
   entity: 'flashcards',
   request: request,
 }
 STATE.post(newItem);

 });

 function post_instance_flashcards(instanceData){
  renderFlashcardsInput('books-list', instanceData);
}