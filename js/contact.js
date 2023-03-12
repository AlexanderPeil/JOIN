let contacts = [];


async function initContact() {
    await includeHTML();
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
    document.getElementById('contactOverlay').classList.add('show-contact-selection-overlay');
}


function closeContactOverlay(){
    /*this.overlayMenu.classList.remove('show-overlay-menu');*/
    document.getElementById('contactOverlay').classList.remove('show-contact-selection-overlay');
}


// Delete the last contact from array
async function deleteContacts() {
    contacts.pop();
    backend.setItem('contacts', JSON.stringify(contacts));
    updateContactList();
}


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
        <div onclick="closeContactOverlay()" class="close-btn close-btn-overlay">
            <img class="close-icon" src="./assets/img/arrow_left.svg" alt="#">
        </div>
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
                        <input class="p-none"type="color" id="color" name="color" value="${selectedContact.color}" required>
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


function openAddTaskContactFormHTML() {
    return `
    <form id="formTaskContainer" class="contact-form-overlay" onsubmit="addTask(); return false;">
        <div class="add-form-left">
            <span class="contact-form-heading">Add Task</span>
            <div>
                <div class="selection-container">
                    <label>Title</label>
                    <input placeholder="Enter a title" id="title_textfield" required>
                </div>
                <div class="selection-container">
                    <label>Description</label>
                    <textarea placeholder="Enter a description" id="description_textfield" required></textarea>
                </div>
                <div class="selection-container prevent-select">
                    <label>Category</label>
                    <div class="select-wrapper" onclick="openDropdown('category-choices')">
                        <div class="sector_top">
                            <p id="category-header">Select your Category</p><img src="./assets/img/arrow_down.png">
                        </div>
                        <div class="category-choices d-none" id="category-choices">
                            <div class="category" onclick="changeCategoryHeader('Marketing')">
                                <div id="marketing">Marketing </div>
                                <div class="circle" style="background: #0038ff;"></div>
                            </div>
                            <div class="category" onclick="changeCategoryHeader('Media')">
                                <div>Media </div>
                                <div class="circle" style="background: #ffc702;"></div>
                            </div>
                            <div class="category" onclick="changeCategoryHeader('Backoffice')">
                                <div>Backoffice </div>
                                <div class="circle" style="background: #1FD7C1;"></div>
                            </div>
                            <div class="category" onclick="changeCategoryHeader('Design')">
                                <div>Design </div>
                                <div class="circle" style="background:  #ff7a00;"></div>
                            </div>
                            <div class="category" onclick="changeCategoryHeader('Sales')">
                                <div>Sales </div>
                                <div class="circle" style="background: #fc71ff;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="selection-container prevent-select">
                    <label>Assigned To</label>
                    <div class="select-wrapper assigned-to-wrapper">
                        <div class="sector_top" onclick="openDropdown('assigned-to-choices')">
                            <p id="assigned-to-header">Select your Members</p><img
                                src="./assets/img/arrow_down.png">
                        </div>
                        <div class="assigned-to-choices d-none" id="assigned-to-choices">
                            <div class="assigned-to" onclick="changeCategoryHeader('Marketing')">
                                <div id="marketing">Marketing </div>
                                <div class="circle" style="background: #0038ff;"></div>
                            </div>
                            <div class="assigned-to" onclick="changeCategoryHeader('Media')">
                                <div>Media </div>
                                <div class="circle" style="background: #ffc702;"></div>
                            </div>
                            <div class="assigned-to" onclick="changeCategoryHeader('Backoffice')">
                                <div>Backoffice </div>
                                <div class="circle" style="background: #1FD7C1;"></div>
                            </div>
                            <div class="assigned-to" onclick="changeCategoryHeader('Design')">
                                <div>Design </div>
                                <div class="circle" style="background:  #ff7a00;"></div>
                            </div>
                            <div class="assigned-to" onclick="changeCategoryHeader('Sales')">
                                <div>Sales </div>
                                <div class="circle" style="background: #fc71ff;"></div>
                            </div>
                        </div>
                    </div>
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
                        <input class="date" type="date" id="date" name="date" required>
                    </div>
                    <div class="features-container">
                        <label>Prio</label>
                        <div onchange="changeColor(); return false" class="prio-btn-container">
                            <input type="radio" class="checkbox_urgen" id="urgentBtn" name="radio">
                            <label for="urgentBtn" class="prio-btn prio-urgent urgentSection" for="checkbox_urgen"
                                id="urgentSection">
                                Urgent<img id="prioUrgentWhite" src="assets/img/Prio-urgent.png">
                            </label>
                            <input type="radio" class="checkbox_medium" id="mediumBtn" name="radio">
                            <label for="mediumBtn" class="prio-btn prio-urgent mediumSection" for="checkbox_urgen"
                                id="mediumSection">
                                Medium<img id="prioUrgentWhite" src="assets/img/Prio-medium.png">
                            </label>
                            <input type="radio" class="checkbox_low" id="lowBtn" name="radio" checked>
                            <label for="lowBtn" class="prio-btn prio-urgent lowSection" for="checkbox_urgen"
                                id="lowSection">
                                Low<img id="prioUrgentWhite" src="assets/img/prio-low-white.png">
                            </label>
                        </div>
                        <div class="features-container">
                            <label>Subtasks</label>
                            <div class="subtask-container">
                                <input class="subtask-input" onclick="inputChangeSubIcons()"placeholder="Add new subtask" id="subtask">
                                <img id="plusSubtaskImg" class="plus-icon" src="assets/img/plus-icon.png" onclick="changeSubIcon()">
                                <div class="subtask-img-container">
                                <img id="clearSubtaskImg" src="assets/img/icon_cancel_subtask.svg" onclick="clearSubtask()" class="subtask-icons d-none">
                                <div class="gap-img-subtask"></div>
                                <img id="addSubtaskImg" src="assets/img/icon_check_subtask.svg" onclick="addSubtask()" class="subtask-icons d-none">
                                </div>
                            </div>
                            <div>
                                <ul id="subtask-list">
                                </ul>
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

function openDropdown(id) {
    if (document.getElementById(id).classList.contains('d-none')) {
        document.getElementById(id).classList.remove('d-none');
    }
    else if (!document.getElementById(id).classList.contains('d-none')) {
        document.getElementById(id).classList.add('d-none');
    }
}

function addAssignedToList() {
    document.getElementById('assigned-to-choices').innerHTML = '';
    // document.getElementById('assigned-to-choices').innerHTML += `<select id=assigned-test></select>`;
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstName = contact['firstName'];
        let lastName = contact['lastName'];
        let acronym = firstName[0] + lastName[0];

        console.log('Vorname: ' + firstName + ' | Nachname: ' + lastName + ' | Abkürzung: ' + acronym);

        document.getElementById('assigned-to-choices').innerHTML += `<div class="assigned-to-line"><label for="assigned-to-${i}" id="assigned_name${i}">${firstName + ' ' + lastName}</label><input type="checkbox" id="assigned-to-${i}" value="${acronym}"></div>`
    }
}