function renderNavBar() {
    const navBar = document.createElement('nav');
    navBar.classList.add('navbar');

    const logo = document.createElement('img');
    logo.src = '../../images/LilacLogotype.jpg';
    logo.classList.add('logo');
    navBar.appendChild(logo);

    const boxContainer = document.createElement('div');
    boxContainer.classList.add('box-container');

    const links = [
        { text: 'My flashcards', url: 'flashcards.html' },
        { text: 'Create flashcards', url: '' }, // edit flashcards.js, knapp med eventlistener ist 4 lank  cardBox.addEventListener("click", (e) => {renderPlayFlashcardsContainer();
         

        { text: 'Log out', url: 'index.html' } 
    ];

    links.forEach(linkData => {
        const box = document.createElement('div');
        box.classList.add('box');
        const link = document.createElement('a');
        link.textContent = linkData.text;
        link.href = linkData.url;
        box.appendChild(link);
        boxContainer.appendChild(box);
    });

    navBar.appendChild(boxContainer);

    //document.body.appendChild(navBar);
}

renderNavBar();
