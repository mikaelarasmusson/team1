function renderDialog(parentId) {
  const parent = document.getElementById(parentId);
  const selfId = "dialog";
  let dom = document.createElement("dialog");
  dom.id = selfId;

  dom.innerHTML = `
    <form id="dialogForm" method="dialog">
      <p></p>
      <button id="dialogOkButton" >OK</button>
    </form>
  `;

  parent.append(dom);
  };