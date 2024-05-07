async function renderActiveFlashcardContainer(parentId) {
  const parent = document.getElementById(parentId);

  dom.innerHTML = `
      <div id = "activeFlahcardContainer">
      <p class = "deckSubject"> DU1</p>
      <p class = "deckUsername"> Sabina</p>
      <h1 class = "question"> Question</h1>
       </div>
      `

  // alla flashcard
  let flashcards = await getFlashcardInformation();
  // ta reda på vilket val dom gjort (dvs deck)
  let deckIdChoice = State.getEntity("deckIdChoice");

  // Ta ut och visa en fråga

  // Klicka mellan flera

  // hämta en fråga från den valda decken
  parent.append(dom);
}