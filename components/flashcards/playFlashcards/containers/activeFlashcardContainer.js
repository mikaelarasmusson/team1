function renderActiveFlashcardContainer(parentId){
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

  const question = document.createElement("h1");
  question.classList.add("question");
  question.textContent = `${"questions"[0].question}`;

  const answer = document.createElement("h1");
  answer.classList.add("answer");
  answer.textContent = `${"questions"[0].answer}`; //Hur når vi frågan och svaret på exakt kort.
  console.log(answer);

  dom.classList.add("activeFlashcards");

  parent.append(dom);

  renderFlashcardInformation("question", "answer");
}