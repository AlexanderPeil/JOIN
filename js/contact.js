let contacts = [];
let letters = [];

// Fetching data from JSON-File
async function init() {
    let response = await fetch('./js/contact.json');
    contacts = await response.json();
    render();
}


// Render contact list + function to filter first letters 
function render(filter) {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    renderContacts(contactList, filter);
}


// This function iterates over the contacts and generates contact detail for each contact.
// 'currentLetter' checks if the first letter of the last contact is the same as the current contact.
function renderContacts(contactList, filter){
    let currentLetter = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const lastName = contact.lastName;
        const firstName = contact.firstName;
        const email = contact.email;
        const firstLetter = contact.lastName.charAt(0);
        const firstLetterFirstName = contact.firstName.charAt(0);
        if(!filter || filter == firstLetter) {
            if (firstLetter !== currentLetter) {
                contactList.innerHTML += `
                    <div class="contact-index">${firstLetter}</div>
                    <div class="contact-underline"></div>
                `;
                currentLetter = firstLetter;
            }
            contactList.innerHTML += generateContactDetail(firstLetter, firstLetterFirstName, lastName, firstName, email, i, contact);
        }
    }
    renderLetters();
}


function generateContactDetail(firstLetter, firstLetterFirstName, lastName, firstName, email, i, contact) {
    return `
        <div onclick="showContactDetails(${i})" class="contact-list-box" title="show contact details">
            <div id="contactColor" class="contact-letters small-letters" style="background-color: ${contact.color}">
                ${firstLetter} ${firstLetterFirstName}
            </div>
            <div class="contact-details">
                <div class="contact-name">${lastName} ${firstName}</div>
                <div class="contact-email">${email}</div>
            </div>
        </div>
    `;
}


/* Kurzverzeichnis wird vorerst nicht benötigt
// Show (first) letters to filter content
function renderLetters() {
    let letterbox = document.getElementById('firstLetter');
    letterbox.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letterbox.innerHTML += `<div class="letter-box" title="filter letters" onclick="setFilter('${letter}')" class="letter">${letter}</div>`;
    }
}
*/


// Onclick-Function (see renderLetters())
function setFilter(letter) {
    render(letter);
}

/* Reload-Funktion wird vorerst nicht benötigt
// Onclick-Function (see header)
function reload() {
    location.reload();
}
*/


function showContactDetails(i) {
    let contactSelection = document.getElementById('contactSelection');
    contactSelection.innerHTML = '';
    let selectedContact = contacts[i];
    contactSelection.innerHTML += showContactDetailsHTML(selectedContact);
}


function showContactDetailsHTML(selectedContact) {
    return `
        <div class="contact-selection">
            <div id="selectedContactColor" class="contact-letters big-letters" style="background-color: ${selectedContact.color}">${selectedContact.lastName.charAt(0)} ${selectedContact.firstName.charAt(0)}</div>
            <div>
                <div class="contact-information-name">${selectedContact.lastName} ${selectedContact.firstName}</div>
                <div class="contact-add-task">+ Add Task</div>
            </div>
        </div>
        <div class="contact-information-title">
            <p>Contact Information</p>
            <div class="contact-edit"><img class="contact-edit-icon" src="./assets/img/edit_icon.svg">Edit Contact</div>
        </div>
        <h4>Email</h4>
        <div class="contact-email">${selectedContact.email}</div>
        <h4>Phone</h4>
        <div class="contact-name">${selectedContact.phone}</div>
    `;
}


// Contact form
function openAddContactForm() {
    const formContainer = document.getElementById("formContainer");
    formContainer.style.display = "block";
}

function closeForm() {
    const formContainer = document.getElementById("formContainer");
    formContainer.style.display = "none";
}