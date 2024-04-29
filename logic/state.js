"use strict"

const _STATE = {

};

const State = {
    get,
    post,
    patch,
    Delete,
    LoginRegister
}

// Skapa get som en funktion som hämtar från databasen, och stoppar in i state-objektet
// Gör om denna get till getEntity.
async function get (data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);
    console.log(entity);

    if (response.ok) {
        const resource = await response.json();
        _STATE[entity] = resource;
        console.log(resource);
    }
}    

async function post (data) {
    const entity = data.entity;
    const rqst = data.rqst;

}

async function patch (data) {

}

async function Delete (data) {

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