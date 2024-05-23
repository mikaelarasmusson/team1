"use strict"

const _STATE = {

};

const State = {
    get,
    getEntity,
    post,
    patch,
    Delete,
    LoginRegister,
    saveEntity
}

function saveEntity (entity, value) {
    _STATE[entity] = value;
}

function getEntity(entity) {
    const copy = JSON.parse(JSON.stringify(_STATE[entity]));
    return copy;
}

async function get(data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);

    if (response.ok) {
        const resource = await response.json();
        _STATE[entity] = resource;
    }
}

async function post(data) {
    const entity = data.entity;
    const rqst = data.rqst; 

    const response = await fetcher(rqst);
    if (!response.ok) {
      alert ('Something went wrong' + response.statusText);
      return;
    }

    const resource = await response.json();

    _STATE[entity].push(resource);

    //message = `New deck created! Subject: ${resource.subject} Cards: ${resource.questions.length}`;
    //document.getElementById('dialog').textContent = message 
   // alert(`New deck created! Subject: ${resource.subject} Cards: ${resource.questions.length}`);
   renderDialog("wrapper", resource.subject, resource.questions.length); 
}

async function patch(data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);

    if (response !== undefined) {
        const resource = await response.json();

        document.getElementById("changeMessage").textContent = resource;
    } else {
        document.getElementById("changeMessage").textContent = resource;
    }
}

async function Delete(data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);

    if (response !== undefined) {
        const resource = await response.json();

        const index = _STATE[entity].findIndex(element => element.id === resource.id);

        const deletedData = _STATE[entity].splice(index, 1);

        switch (entity) {
            case "flashcards":
                deleteFlashcardBox(deletedData[0].id);
                break;
        }
    }
}

async function LoginRegister(data) {
    const type = data.type;
    const entity = data.entity;
    const rqst = data.rqst;
    console.log(type);
    console.log(entity);

    const response = await fetcher(rqst);
    console.log(response);

    if (response.ok) {
        const resource = await response.json();
        console.log(resource);

        switch (type) {
            case "Login":
                localStorage.setItem("user", JSON.stringify(resource));
                const userId = JSON.parse(localStorage.getItem("user"));
                // const userFlashcards = await getUserFlashcards(userId["id"]);
                // localStorage.setItem("userFlashcards", JSON.stringify(userFlashcards));
                window.location = "./components/flashcards/flashcards.html";
                break;
            case "Register":
                document.getElementById("registermessage").textContent = resource;
                break;
        }
    }
}