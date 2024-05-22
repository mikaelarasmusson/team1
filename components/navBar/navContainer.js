function renderNavBar (parentId) {
    const parent = document.getElementById(parentId);

    const logo = document.createElement('img');
    logo.src = '../../images/LilacLogotype.jpg';
    logo.classList.add('logo');
    parent.appendChild(logo);

    const boxContainer = document.createElement('div');
    boxContainer.classList.add('box-container');

    const links = [
        { text: 'My flashcards', url: renderFlashcardBoxes },
        { text: 'Create flashcards', url: renderContent },
        { text: 'Log out', url: logout } 
    ];

    links.forEach(linkData => {
        const link = document.createElement('button');
        link.classList.add('navButtons');
        link.textContent = linkData.text;
        link.addEventListener('click', linkData.url)
        boxContainer.appendChild(link);
    });

    parent.appendChild(boxContainer); 
}

function logout () {
    window.localStorage.removeItem('user');
    window.location = '../../index.html';
}