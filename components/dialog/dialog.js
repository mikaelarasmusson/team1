"use strict"

function renderDialog(parentId, subject, cards) {
  const parent = document.getElementById(parentId);
  const selfId = "dialog";
  let dom = document.createElement("dialog");
  dom.id = selfId;
  
  parent.append(dom); 

  dom.innerHTML = `
    <form id="dialogForm" method="dialog">
      <p id="dialogText">New deck created! Subject: ${subject} Cards: ${cards}</p>
      <button id="dialogOkButton" >OK</button>
    </form>
  `;
  dom.showModal();
};