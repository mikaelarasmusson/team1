function renderSwitchFlashcardContainer(parentId){
  const parent = document.getElementById(parentId);
  const selfId =  "switchFlashcardContainer";
  let dom = document.createElement("div");
  dom.id = selfId;
  dom.classList.add("switchFlashcard");

  dom.innerHTML = `
  <button id="back-button" class="switchButton">←</button>
  <p id="current-card-number">0</p>
  <button id="next-button" class="switchButton">→</button>
  `;

  State.saveEntity("currentCardNum", 0);

  dom.querySelector("#back-button").addEventListener("click", (e) => {
    let currentCardNum = State.getEntity("currentCardNum");

    if (currentCardNum === 0) {
      return; 
    }

    document.getElementById("current-card-number").textContent = --currentCardNum;
    State.saveEntity("currentCardNum", currentCardNum--);
    renderFlashcardContent("activeFlashcardContainer");
  })

  dom.querySelector("#next-button").addEventListener("click", (e) => {
    let currentCardNum = State.getEntity("currentCardNum");
    let currentDeck = State.getEntity('currentDeck');

    if(currentCardNum === currentDeck.questions.length - 1) {
      return;
    }

    document.getElementById("current-card-number").textContent = ++currentCardNum;
    State.saveEntity("currentCardNum", currentCardNum++);
    renderFlashcardContent("activeFlashcardContainer");
  })

  parent.append(dom);
}