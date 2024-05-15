function renderEditActiveFlascardContainer(parentId) {
  const parent = document.getElementById(parentId);
  const selfId = "editActiveFlashcardContainer";
  let dom = document.createElement("div");
  dom.id = selfId;

  dom.innerHTML = `
    <div class="subjectNameContainer">

      <div class="nameSubjectPost">
        <input class="nameSubject" id = "subjectInput" placeholder="Add Subject Here"></input>
        <button class="nameSubjectButton">Post</button>
      </div>

      <div class="nameSubjectPost">
        <p>Name</p>
      </div>

    </div>

    <div class="postInputContainer">

      <div class ="inputPost">
        <input class = "editInput" id = "questionInput"placeholder="Add Question Here"></input>
        <button id= "postButton" class="controlsButton">Post</button>
      </div>

      <div class="inputPost">
        <input class = "editInput" id= "answerInput" placeholder="Add Answer Here"></input>
        <button id= "postButton" class="controlsButton">Post</button>
      </div>

    </div>
  `;

  // ta bort alla post knappar och bara ha Save?? Spara allt i samma knapptryck
  // Går det ens att spara individuellt???

  parent.append(dom);
}