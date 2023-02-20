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
    // renderLetters();
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


// Onclick-Function (see renderLetters())
function setFilter(letter) {
    render(letter);
}


function showContactDetails(i) {
    let contactSelection = document.getElementById('contactSelection');
    contactSelection.innerHTML = '';
    let selectedContact = contacts[i];
    contactSelection.innerHTML += showContactDetailsHTML(selectedContact, i);
}


function showContactDetailsHTML(selectedContact, i) {
    return `
        <div class="contact-selection">
            <div id="selectedContactColor" class="contact-letters big-letters" style="background-color: ${selectedContact.color}">${selectedContact.lastName.charAt(0)} ${selectedContact.firstName.charAt(0)}</div>
            <div>
                <div class="contact-information-name">${selectedContact.lastName} ${selectedContact.firstName}</div>
                <div title="add new task" onclick="addTaskContact(${i})" class="contact-add-task">+ Add Task</div>
            </div>
        </div>
        <div class="contact-information-title">
            <p>Contact Information</p>
            <div title="edit contact info" onclick="editContact(${i})" class="contact-edit"><img class="contact-edit-icon" src="./assets/img/edit_icon.svg">Edit Contact</div>
        </div>
        <h4>Email</h4>
        <div class="contact-email">${selectedContact.email}</div>
        <h4>Phone</h4>
        <div class="contact-name">${selectedContact.phone}</div>
    `;
}


// Contact from to edit an existing contact
function editContact(i) {
    selectedContact = contacts[i]; // assign the selected contact to the global variable
    const formEditContainer = document.getElementById("formContainer");
    formEditContainer.innerHTML += openEditContactFormHTML(selectedContact);
}


function openEditContactFormHTML(selectedContact) {
    return `
    <form id="contactForm" class="contact-form-overlay" onsubmit="login(); return false;">
        <div class="contact-form-left">
            <img class="contact-form-logo" src="./assets/img/Logo-Join.png" alt="#">
            <span class="contact-form-heading">Edit Contact</span>
            <img class="contact-form-underline" src="assets/img/underline.svg" alt="">
        </div>
        <div class="contact-form-right">
        <div id="selectedContactColor" class="contact-letters big-letters margin-letters" style="background-color: ${selectedContact.color}">${selectedContact.lastName.charAt(0)} ${selectedContact.firstName.charAt(0)}</div>
        <div class="contact-input-container">
                <div onclick="closeForm()" class="icon-top-right" title="close form">
                    <img class="contact-cancel-icon" src="./assets/img/contact-cancel-icon.svg" alt="#">
                </div>
                <input class="contact-input-field input-name-img" type="text" name="name" placeholder="First Name" id="firstName" value="${selectedContact.firstName}" required>
                <input class="contact-input-field input-name-img" type="text" name="name" placeholder="Last Name" id="lastName" value="${selectedContact.lastName}" required>
                <input class="contact-input-field input-email-img" type="email" name="email" placeholder="Email" id="email" value="${selectedContact.email}" required>
                <input class="contact-input-field input-phone-img" type="tel" name="phone" placeholder="Phone" id="phone" value="${selectedContact.phone}" required>
                <div class="contact-form-buttons">
                    <button type="button" onclick="closeForm()" class="contact-cancel-btn" title="close form">
                        <p>Cancel</p>
                        <img class="contact-create-icon" src="./assets/img/contact-cancel-icon.svg" alt="#">
                    </button>
                    <button onclick="saveEditedContact()" type="submit" class="contact-add-btn" title="save contact">
                        <p>Save</p>
                        <img class="contact-create-icon" src="./assets/img/contact-create-icon.svg" alt="#">
                    </button>
                </div>
            </div>
        </div>
    </form>
    `;
}


// Contact form to add a new contact
function openAddContactForm() {
    const formContainer = document.getElementById("formContainer");
    formContainer.innerHTML += openAddContactFormHTML();
}


function openAddContactFormHTML() {
    return `
    <form id="contactForm" class="contact-form-overlay" onsubmit="login(); return false;">
        <div class="contact-form-left">
            <img class="contact-form-logo" src="./assets/img/Logo-Join.png" alt="#">
            <span class="contact-form-heading">Add Contact</span>
            <p class="contact-form-slogan">Tasks are better with a team!</p>
            <img class="contact-form-underline" src="assets/img/underline.svg" alt="">
        </div>
        <div class="contact-form-right">
            <img class="contact-form-user-icon" src="./assets/img/contact-user-icon.svg">
            <div class="contact-input-container">
                <div onclick="closeForm()" class="icon-top-right" title="close form">
                    <img class="contact-cancel-icon" src="./assets/img/contact-cancel-icon.svg" alt="#">
                </div>
                <input class="contact-input-field input-name-img" type="text" name="name" placeholder="First Name" id="firstName" required>
                <input class="contact-input-field input-name-img" type="text" name="name" placeholder="Last Name" id="lastName" required>
                <input class="contact-input-field input-email-img" type="email" name="email" placeholder="Email" id="email" required>
                <input class="contact-input-field input-phone-img" type="tel" name="phone" placeholder="Phone" id="phone" required>
                <div class="contact-form-buttons">
                    <button type="button" onclick="closeForm()" class="contact-cancel-btn" title="close form">
                        <p>Cancel</p>
                        <img class="contact-create-icon" src="./assets/img/contact-cancel-icon.svg" alt="#">
                    </button>
                    <button onclick="createNewContact()" type="submit" class="contact-add-btn" title="create new contact">
                        <p>Create Contact</p>
                        <img class="contact-create-icon" src="./assets/img/contact-create-icon.svg" alt="#">
                    </button>
                </div>
            </div>
        </div>
    </form>
    `;
}


function closeForm() {
    const contactForm = document.getElementById("contactForm");
    contactForm.remove(); // remove the form element from the DOM
}


function createNewContact() {
    let id; //
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let color = 'grey'; // default color

    let newContact = {
        id: id, //
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        color: color //
    };

    // Load existing contacts from the contact.js file
    try {
        const contactJson = localStorage.getItem('contacts');
        if (contactJson !== null) {
            contacts = JSON.parse(contactJson);
    }
    } catch (e) {
        console.error('Error loading contacts:', e);
    }

    // Add the new contact to the list and assign an ID
    newContact.id = contacts.length;
    contacts.push(newContact);

    // Save the updated contacts back to the contact.js file
    try {
        const contactJson = JSON.stringify(contacts);
        localStorage.setItem('contacts', contactJson);
    } catch (e) {
        console.error('Error saving contacts:', e);
    }
    renderContacts(); // reload contact list
}


// Add Task
function addTaskContact(i) {
    selectedContact = contacts[i]; // assign the selected contact to the global variable
    const formTaskContainer = document.getElementById("formContainer");
    formTaskContainer.innerHTML += openAddTaskContactFormHTML(selectedContact);
}


function openAddTaskContactFormHTML(selectedContact) {
    return `
    <form id="contactForm" class="contact-form-overlay" onsubmit="login(); return false;">
        <div class="contact-form-left-neutral">
            <span class="contact-form-heading">Add Task</span>
            <div>
                <div class="selection-container">
                    <label>Title</label>
                    <input placeholder="Enter a title">
                </div>
                <div class="selection-container">
                    <label>Description</label>
                    <textarea placeholder="Enter a description"></textarea>
                </div>
                <div class="selection-container">
                    <label>Category</label>
                    <select class="select-wrapper">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
                <div class="selection-container">
                    <label>Assigned to</label>
                    <select>  
                    </select>
                </div>
            </div>
        </div>
        <div class="seperator-line-container">
            <div class="separator-line"></div>
        </div>
        <div class="contact-form-right">
            <div class="contact-input-container">
                <div onclick="closeForm()" class="icon-top-right" title="close form">
                    <img class="contact-cancel-icon" src="./assets/img/contact-cancel-icon.svg" alt="#">
                </div>
                <div>
                    <div class="features-container">
                        <label for="date">Due Date</label>
                        <input class="date" type="date" id="date" name="date">
                    </div>
                    <div class="features-container">
                        <label>Prio</label>
                        <div class="prio-btn-container">
                            <button onclick="showUrgentRedBtn()" id="urgentBtnWhite" class="prio-btn prio-urgent">Urgent<img id="prioUrgentWhite" src="assets/img/Prio-urgent.png"></button>
                            <button onclick="showUrgentWhiteBtn()" id="urgentBtnRed" class="d-none prio-btn-red prio-urgent">Urgent<img id="prioUrgentRed" src="assets/img/Prio-urgent-white.png"></button>

                            <button onclick="showMediumOrangeBtn()" id="mediumBtnWhite" class="prio-btn prio-medium">Medium<img src="assets/img/Prio-medium.png"></button>
                            <button onclick="showMediumWhiteBtn()" id="mediumBtnOrange" class="d-none prio-btn-orange prio-medium">Medium<img src="assets/img/prio-medium-white.png"></button>

                            <button onclick="showLowGreenBtn()" id="lowBtnWhite" class="prio-btn prio-low">Low<img src="assets/img/Prio-low.png"></button>
                            <button onclick="showLowWhiteBtn()" id="lowBtnGreen" class="d-none prio-btn-green prio-low">Low<img src="assets/img/Prio-low-white.png"></button>
                        </div>
                        <div class="features-container">
                            <label>Subtasks</label>
                            <div class="subtask-container">
                                <input class="subtask-input" placeholder="Add new subtask">
                                <img class="plus-icon" src="assets/img/plus-icon.png" onclick>
                                <img src="#" class="d-none">
                                <img src="#" class="d-none">
                            </div>
                        </div>
                </div>
                <div class="contact-form-buttons">
                    <button type="button" onclick="closeForm()" class="contact-cancel-btn" title="close form">
                        <p>Cancel</p>
                        <img class="contact-create-icon" src="./assets/img/contact-cancel-icon.svg" alt="#">
                    </button>
                    <button type="submit" class="contact-add-btn" title="add new task">
                        <p>Create Task</p>
                        <img class="contact-create-icon" src="./assets/img/contact-create-icon.svg" alt="#">
                    </button>
                </div>
            </div>
        </div>
    </form>
    `;
}