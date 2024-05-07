async function renderActiveFlashcardContainer(parentId){
  const parent = document.getElementById(parentId);
  const selfId =  "activeFlashcardContainer";
  let dom = document.createElement("div");
  dom.id = selfId;

  const deckSubject = document.createElement("p");
  deckSubject.classList.add("deckSubject");
  deckSubject.textContent = "DU1";

  const deckUsername = document.createElement("p");
  deckUsername.classList.add("deckUsername");
  deckUsername.textContent = "Sabi13";

  // alla flashcard
  let flashcards = await getFlashcardInformation();
  // ta reda på vilket val dom gjort (dvs deck)
  let deckIdChoice = State.getEntity("deckIdChoice");
  
  // Ta ut och visa en fråga

  // Klicka mellan flera

  // hämta en fråga från den valda decken


  const question = document.createElement("h1");
  question.classList.add("question");
  question.textContent 

  const answer = document.createElement("h1");
  answer.classList.add("answer");
  answer.textContent //Hur når vi frågan och svaret på exakt kort.
  console.log(answer);

  dom.classList.add("activeFlashcards");

  parent.append(dom);




}