function renderActiveFlashcardContainer(parentId) {
  const parent = document.getElementById(parentId);
  const selfId = "activeFlashcardContainer";
  let dom = document.createElement("div");
  dom.id = selfId;
  dom.classList.add("activeFlashcards");

  //Lägg en eventlyssnare på kortet som flippar till svaret.
  // Uppdatera texten till svaret.

  // Spara ett flashcard man gjort
  parent.append(dom);
  renderFlashcardContent(selfId);
}

function renderFlashcardContent(parentId) {
  const parent = document.getElementById(parentId);
  // alla flashcard
  let flashcards = State.getEntity("flashcards");
  // ta reda på vilket val dom gjort (dvs deck)
  let deckIdChoice = State.getEntity("deckIdChoice");

  const editButton = document.createElement("div");
  editButton.classList.add("edit-Button");
  editButton.innerHTML = `
  <button id="edit-Button">Edit</button>`;

  editButton.addEventListener("click", (e) => {
    State.saveEntity("deckIdChoice", flashcards.id);
    renderContainerRight();

  })


  console.log(deckIdChoice);

  let questionElement;
  let subject;

  for (let i = 0; i < flashcards.length; i++) {
    if (deckIdChoice === flashcards[i].id) {
      let questions = flashcards[i].questions;
      let currentCardNum = State.getEntity("currentCardNum");
      questionElement = questions[currentCardNum];
      subject = flashcards[i].subject;
    }
  }

  parent.innerHTML = `
  <p class = "deckSubject">${subject}</p>
  <p class = "deckUsername">Sabina</p>
  <h1 class = "question">${questionElement.question}</h1>
  <h1 class = "answer">${questionElement.answer}</h1>
  `;


  parent.append(editButton);
}

function addEditButton(parentId) {
  const editButton = document.createElement("div");
  editButton.classList.add("edit_Button");
  editButton.innerHTML = `
  <button id="edit-Button">Edit</button>`;

  editButton.addEventListener("click", (e) => {
    State.saveEntity("deckIdChoice", flashcards.id);

  });

}