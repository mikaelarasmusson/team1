"use strict"

const _STATE = {

};

const State = {
    get,
    getEntity,
    post,
    patch,
    Delete,
    LoginRegister
}

// Skapa get som en funktion som hämtar från databasen, och stoppar in i state-objektet
// Gör om denna get till getEntity.
function getEntity (entity) {
    const copy = JSON.parse(JSON.stringify(_STATE[entity]));
    return copy;
}

async function get (data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);
    console.log(entity);

    if (response.ok) {
        const resource = await response.json();
        _STATE[entity] = resource;
        console.log(resource);
        console.log(_STATE);
    }
}    

async function post (data) {
    const entity = data.entity;
    const rqst = data.rqst;

}

async function patch (data) {

}

async function Delete (data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);
    console.log(response);

    
    if (response !== undefined) {
        const resource = await response.json();

        const index = _STATE[entity].findIndex(element => element.id === resource.id);

        const deletedData = _STATE[entity].splice(index, 1);

        switch (entity) {
            case "flashcards":
            deleteFlashcardBox(deletedData[0].id);
                break;
            case "actors":
            deleteInstanceActorsContainer(deletedData[0]);
            renderCounterList("container-left");
                break;
        }
    }
}

async function renderApp() {

}

async function LoginRegister (data) {
    const type = data.type;
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);
    console.log(entity);

    if (response.ok) {
        const resource = await response.json();
        console.log(resource);
        
        switch (type) {
            case "Login":
                _STATE[entity] = resource;
                console.log(_STATE);
                localStorage.setItem("user", JSON.stringify(resource));
                const userId = JSON.parse(localStorage.getItem("user"));
                console.log(userId);
                //renderApp();
                break;
            case "Register":
                alert("Your register was successful");
                break;
        }
    } 
}