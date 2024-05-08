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


/*

CHAT GPT KOD

document.addEventListener('DOMContentLoaded', function() {
  const postQuestionButton = document.querySelector('.postQuestionButton');
  const postAnswerButton = document.querySelector('.postAnswerButton');
  const flashcardsContainer = document.getElementById('editActiveFlashcardContainer');

  function createFlashcard(text) {
    const flashcard = document.createElement('div');
    flashcard.classList.add('flashcard');
    flashcard.textContent = text;
    return flashcard;
  }

  postQuestionButton.addEventListener('click', function() {
    const questionInput = document.querySelector('.editInput');
    const question = questionInput.value.trim();
    if (question !== '') {
      const flashcard = createFlashcard(`Question: ${question}`);
      flashcardsContainer.appendChild(flashcard);
      questionInput.value = '';
    }
  });

  postAnswerButton.addEventListener('click', function() {
    const answerInput = document.querySelectorAll('.editInput')[1];
    const answer = answerInput.value.trim();
    if (answer !== '') {
      const flashcard = createFlashcard(`Answer: ${answer}`);
      flashcardsContainer.appendChild(flashcard);
      answerInput.value = '';
    }
  });
});
*/