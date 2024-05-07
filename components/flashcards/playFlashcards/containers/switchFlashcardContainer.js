function renderSwitchFlashcardContainer(parentId){
  const parent = document.getElementById(parentId);
  const selfId =  "switchFlashcardContainer";
  let dom = document.createElement("div");
  dom.id = selfId;
  dom.classList.add("switchFlashcard");

  dom.innerHTML = `
  <button id="back-button">Back</button>
  <p id="current-card-number">0</p>
  <button id="next-button">Next</button>
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
    document.getElementById("current-card-number").textContent = ++currentCardNum;
    State.saveEntity("currentCardNum", currentCardNum++);
    renderFlashcardContent("activeFlashcardContainer");
  })

  parent.append(dom);

  //renderSwitchFlashcard(selfId);
}