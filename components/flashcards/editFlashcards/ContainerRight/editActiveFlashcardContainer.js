function renderEditActiveFlascardContainer(parentId) {
  const parent = document.getElementById(parentId);
  const selfId = "editActiveFlashcardContainer";
  let dom = document.createElement("div");
  dom.id = selfId;

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.username : "Anonymous"; // Använd 'Anonymous' om ingen användare är inloggad

  dom.innerHTML = `
    <div class="subjectNameContainer">

      <div class="nameSubjectPost">
        <input class="nameSubject" id ="subjectInput" placeholder="Add Subject Here"></input>
      </div>

      <div class="nameSubjectPost">
        <p>${username}</p>
      </div>

    </div>

    <div class="postInputContainer">

    <p id="error"></p>

      <div class ="inputPost">
        <input class = "editInput" id ="questionInput"placeholder="Add Question Here"></input>
      </div>

      <div class="inputPost">
        <input class = "editInput" id= "answerInput" placeholder="Add Answer Here"></input>
      </div>

    </div>
  `;

  parent.append(dom);
}