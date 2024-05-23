"use strict"

async function getFlashcardInformation() {
  const flashcardData = {
    entity: "flashcards",
    rqst: "../../api/flashcards.php"
  }
  console.log(flashcardData);

  await State.get(flashcardData);
  State.saveEntity("deckIdChoice", 1);
  renderPlayFlashcardsContainer("wrapper");
}

