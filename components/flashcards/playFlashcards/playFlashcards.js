function renderSwitchFlashcard() {
  // Anropas i SwitchFlashcardContainer, ska innehålla pilarna till varje flashcard
}

// Här ska hela playflashcards renderas när html tas bort.

async function getFlashcardInformation() {
  const flashcardData = {
    entity: "flashcards",
    rqst: "../../../api/flashcards.php"
  }
  console.log(flashcardData);

  await State.get(flashcardData);
  State.saveEntity("deckIdChoice", 1);
  renderPlayFlashcardsContainer("wrapper");

  // Now you can use the `flashcards` variable to work with the flashcards

  // const questions = [];
  // for (let i = 0; i < flashcards.length; i++) {
  //   questions.push(flashcards[i].questions);
  // }
  // console.log(questions);

  // return questions[0];
}

