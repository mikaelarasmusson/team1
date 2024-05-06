function renderSwitchFlashcard() {
  // Anropas i SwitchFlashcardContainer, ska innehålla pilarna till varje flashcard
}

async function renderFlashcardInformation() {
  const flashcardData = {
    entity: "flashcards",
    rqst: "../../../api/flashcards.php"
  }
  console.log(flashcardData);

  await State.get(flashcardData);
  const flashcards = State.getEntity("flashcards");
  console.log(flashcards);
  // Now you can use the `flashcards` variable to work with the flashcards

  const questions = [];
  for (let i = 0; i < flashcards.length; i++) {
    questions.push(flashcards[i].questions);
  }
  console.log(questions);
}


renderPlayFlashcardsContainer('wrapper');