let contacts = [];
setURL('https://gruppenarbei-join-460.developerakademie.net/smallest_backend_ever');


async function initContact() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    loadContacts();
}


// Add contacts to array
function addContacts() {
    let id;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let color = document.getElementById('color').value;
    let newContact = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        color: color
    };
    newContact.id = contacts.length;
    contacts.push(newContact);
    backend.setItem('contacts', JSON.stringify(contacts));
     // Reload the contact list
    updateContactList();
    // Reset the input fields
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}


// Load contacts from array and sort them by first letter
function loadContacts() {
    let firstLetters = []; // Array of unique first letters
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstLetter = contact.lastName.charAt(0).toLowerCase();
        if (!firstLetters.includes(firstLetter)) {
            firstLetters.push(firstLetter);
        }
    }
    firstLetters.sort(); // Sorts the array alphabetically
    let contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    for (let i = 0; i < firstLetters.length; i++) {
        const firstLetter = firstLetters[i];
        contactList.innerHTML += `
            <h2 class="contact-index">${firstLetter.toUpperCase()}</h2>
            <div class="contact-underline"></div>
        `;
        for (let j = 0; j < contacts.length; j++) {
            const contact = contacts[j];
            let contactFirstLetter = contact.lastName.charAt(0).toLowerCase();
            if (contactFirstLetter === firstLetter) {
                contactList.innerHTML += generateContactList(contact, j);
            }
        }
    }
}


function showContactDetails(i) {
    let contactSelection = document.getElementById('contactSelection');
    contactSelection.innerHTML = '';
    let selectedContact = contacts[i];
    contactSelection.innerHTML += showContactDetailsHTML(selectedContact, i);
}


// Delete the last contact from array
async function deleteContacts() {
    contacts.pop();
    backend.setItem('contacts', JSON.stringify(contacts));
    updateContactList();
}


/*
// Delete all contacts from array
async function deleteAllContacts() {
    await backend.deleteItem('contacts'); // delete all contacts from array
    updateContactList();
}
*/


function updateContactList() {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    loadContacts();
}


function updateContact() {
    selectedContact.firstName = document.getElementById('firstName').value;
    selectedContact.lastName = document.getElementById('lastName').value;
    selectedContact.email = document.getElementById('email').value;
    selectedContact.phone = document.getElementById('phone').value;
    selectedContact.color = document.getElementById('color').value;
    backend.setItem('contacts', JSON.stringify(contacts));
    updateContactList();
    closeForm();
}


function showContactForm() {
    var contactForm = document.getElementById("contactForm");
    contactForm.classList.remove("d-none");
}


function openAddContactForm() {
    let contactForm = document.getElementById("contactForm");
    contactForm.classList.remove("d-none");
}


function closeAddContactForm() {
    let contactForm = document.getElementById("contactForm");
    contactForm.classList.add("d-none");
}


function editContact(i) {
    selectedContact = contacts[i];
    const formEditContainer = document.getElementById("formContainer");
    formEditContainer.innerHTML += openEditContactFormHTML(selectedContact);
}


function addTaskContact(i) {
    selectedContact = contacts[i]; 
    const formTaskContainer = document.getElementById("formContainer");
    formTaskContainer.innerHTML += openAddTaskContactFormHTML(selectedContact);
}


function closeForm() {
    const contactForm = document.getElementById("contactForm");
    contactForm.remove();
}


// HTML Templates to generate contact list, contact details, add contact form, contact edit form and add task form
function generateContactList(contact, j) {
    return `
        <div onclick="showContactDetails(${j})" class="contact-list-box" title="show contact details">
            <div id="contactColor" class="contact-letters small-letters" style="background-color: ${contact.color}">
                ${contact.firstName.charAt(0).toUpperCase()}${contact.lastName.charAt(0).toUpperCase()}
            </div>
            <div class="contact-details">
                <div class="contact-name">${contact.lastName} ${contact.firstName}</div>
                <div class="contact-email">${contact.email}</div>
            </div>
        </div>
    `;
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


function openEditContactFormHTML(selectedContact) {
    return `
        <div id="contactForm" class="contact-form-overlay">
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
                <form onsubmit="updateContact(); return false;">
                    <div class="form-group">
                        <input class="contact-input-field input-name-img" type="text" placeholder="First Name" id="firstName" name="firstName" value="${selectedContact.firstName}" required>
                    </div>
                    <div class="form-group">
                        <input class="contact-input-field input-name-img" type="text" placeholder="Last Name" id="lastName" name="lastName" value="${selectedContact.lastName}" required>
                    </div>
                    <div class="form-group">
                        <input class="contact-input-field input-email-img" type="email" placeholder="Email" id="email" name="email" value="${selectedContact.email}" required>
                    </div>
                    <div class="form-group">
                        <input class="contact-input-field input-phone-img" type="tel" placeholder="Phone" id="phone" name="phone" value="${selectedContact.phone}" required>
                    </div>
                    <div class="form-group">
                        <input type="color" id="color" name="color" value="${selectedContact.color}" required>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="contact-add-btn">
                            <p>Save</p>
                            <img class="contact-create-icon" src="./assets/img/contact-create-icon.svg" alt="#">
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    `;
}


function openAddTaskContactFormHTML(selectedContact) {
    return `
    <form id="contactForm" class="contact-form-overlay" onsubmit="login(); return false;">
        <div class="add-form-left">
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
        <div class="add-form-right">
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