"use strict"

const _STATE = {
    quotes: [

    ],
    todos: [

    ],
    users: [

    ],
    flashcards: [

    ]
};

const State = {
    get,
    post,
    patch,
    Delete,

}

function get (entity) {
    const copy = JSON.parse(JSON.stringify(_STATE[entity]));
    return copy;
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