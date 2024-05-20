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

// Skapa get som en funktion som hämtar från databasen, och stoppar in i state-objektet
// Gör om denna get till getEntity.
function getEntity(entity) {
    const copy = JSON.parse(JSON.stringify(_STATE[entity]));
    return copy;
}

async function get(data) {
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

async function post(data) {
    const entity = data.entity; //flashcards
    const rqst = data.rqst; // alla nycklar i flashcards

    const response = await fetcher(rqst);
    if (!response.ok) {
      alert ('Something went wrong' + response.statusText);
      return;
    }
    // om  response blir sant --> falskt och då exekveras koden.

    const resource = await response.json();
    console.log(resource);

    alert(`New deck created! Subject: ${resource.subject} Cards: ${resource.questions.length}`);
}

async function patch(data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);

    if (response !== undefined) {
        const resource = await response.json();

        const flashcardId = resource.id;
        const questionId = resource.questions[0].questionId;
        const updatedQuestion = resource.questions[0].question;
        const updatedAnswer = resource.questions[0].answer;

        const flashcardToUpdate = _STATE[entity].find(element => element.id === flashcardId);

        if (flashcardToUpdate) {
            const questionToUpdate = flashcardToUpdate.questions.find(question => question.questionId === questionId);

            if (questionToUpdate) {
                questionToUpdate.question = updatedQuestion;
                questionToUpdate.answer = updatedAnswer;
            } else {
                // Om questionId inte hittas.
                console.log("QuestionId not found in the flashcard");
            }
        } else {
            // Om idt på flashcard inte hittas.
            console.log("FlashcardId not found");
        }
        // renderFlashcardsInput(updatedQuestion, updatedAnswer);
    }
}

async function Delete(data) {
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
        }
    }
}

async function LoginRegister(data) {
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
                localStorage.setItem("user", JSON.stringify(resource));
                const userId = JSON.parse(localStorage.getItem("user"));
                window.location = "./components/flashcards/flashcards.html";
                break;
            case "Register":
                alert("Your register was successful");
                break;
        }
    }
}