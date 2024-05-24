"use strict"

function renderActiveFlashcardContainer(parentId) {
  const parent = document.getElementById(parentId);
  const selfId = "activeFlashcardContainer";
  let dom = document.createElement("div");
  dom.id = selfId;
  dom.classList.add("activeFlashcards");

  parent.append(dom);

  let flashcards = State.getEntity("flashcards");
  let deckIdChoice = State.getEntity("deckIdChoice");

  for (let i = 0; i < flashcards.length; i++) {
    if (deckIdChoice === flashcards[i].id) {
      State.saveEntity('currentDeck', flashcards[i]);
  }}

  renderFlashcardContent(selfId);

  dom.addEventListener('click', (e) => {
    let questions = document.querySelector('.question');
    let answers = document.querySelector('.answer');
    questions.classList.toggle('flip');
    answers.classList.toggle('flip');

    const activeFlashcardContainer = document.getElementById("activeFlashcardContainer");
    const subjectNameContainer = document.getElementById("subjectNameContainer");
    const questionAnswerContainer = document.getElementById("questionAnswerContainer");

    activeFlashcardContainer.style.width = 0;
    subjectNameContainer.classList.toggle("hidden");
    questionAnswerContainer.classList.toggle("hidden");

    setTimeout(() => {
      activeFlashcardContainer.style.width = 100 + "%";
      
      setTimeout(() => {
        subjectNameContainer.classList.toggle("hidden");
        questionAnswerContainer.classList.toggle("hidden");
      }, 100);
      
    }, 300);

  });
}

function renderFlashcardContent(parentId) {
  const parent = document.getElementById(parentId);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.username : "Anonymous"; 

  let currentDeck = State.getEntity('currentDeck');
  let currentCardNum = State.getEntity('currentCardNum');
  let questionElement = currentDeck.questions[currentCardNum];
  let subject = currentDeck.subject;

  parent.innerHTML = `
  <div id="subjectNameContainer">
    <p class="deckSubject">${subject}</p>
    <p class="deckUsername">${username}</p>
  </div>
  <div id="questionAnswerContainer">
  <img src="./images/repeat.png" class="FLIPimage">
    <h1 class="question">Question:<br>${questionElement.question}</h1>
    <h1 class="answer flip">Answer:<br>${questionElement.answer}</h1>
  </div>
  `;
}

