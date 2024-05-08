function renderEditActiveFlascardContainer(parentId) {
  const parent = document.getElementById(parentId);
  const selfId = "editActiveFlashcardContainer";
  let dom = document.createElement("div");
  dom.id = selfId;

  dom.innerHTML = `
    <div class="subjectNameContainer">

      <div class="nameSubjectPost">
        <input class="nameSubject" placeholder="Add Subject Here"></input>
        <button class="nameSubjectButton">Post</button>
      </div>

      <div class="nameSubjectPost">
        <input class = "nameSubject" placeholder="Add Name Here"></input>
        <button class="nameSubjectButton">Post</button>
      </div>

    </div>

    <div class="postInputContainer">

      <div class ="inputPost">
        <input class = "editInput" placeholder="Add Question Here"></input>
        <button id= "postButton" class="controlsButton">Post</button>
      </div>

      <div class="inputPost">
        <input class = "editInput" placeholder="Add Answer Here"></input>
        <button id= "postButton" class="controlsButton">Post</button>
      </div>

    </div>
  `;

  parent.append(dom);
}