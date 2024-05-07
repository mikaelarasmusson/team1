function renderEditActiveFlascardContainer(parentId) {
  const parent = document.getElementById(parentId);
  const selfId = "editActiveFlashcardContainer";
  let dom = document.createElement("div");
  dom.id = selfId;

  dom.innerHTML = `
    <div class="postInputContainer">
    <input class = "editInput" placeholder="Add Question Here"></input>
    <button id= "postButton" class="controlsButton">Post</button>
    </div>

    <div class="postInputContainer">
    <input class = "editInput" placeholder="Add Answer Here"></input>
    <button id= "postButton" class="controlsButton">Post</button>
    </div>
  `;

  parent.append(dom);
}