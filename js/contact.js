let contacts = [];
let newContact = [];


/**
 * Loading the contacts from the server
 * @param {Array} contacts
 */
async function initContact() {
    await includeHTML();
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    loadContacts();
}


/**
 * Add contacts to array
 * Reload the contact list
 * Reset the input fields
 * @param {String} newContact
 */
function addContacts() {
    let id;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let color = document.getElementById('color').value;
    createContactCard(id, firstName, lastName, email, phone, color);
    newContact.id = contacts.length;
    contacts.push(newContact);
    backend.setItem('contacts', JSON.stringify(contacts));
    updateContactList();
    resetInputFields();
}


/**
 * Create contact card
 * @param {*} id 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} email 
 * @param {*} phone 
 * @param {*} color 
 */
function createContactCard(id, firstName, lastName, email, phone, color) {
    newContact = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        color: color
    };
}


/**
 * Load contacts from array and sort them by first letter
 * Array of unique first letters
 * Sorts the array alphabetically
 * @param {Array} contacts
 * @param {String} firstLetter
 * @param {String} contactFirstLetter
 * @param {String} contactList
 */
function loadContacts() {
    let firstLetters = [];
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstLetter = contact.lastName.charAt(0).toLowerCase();
        if (!firstLetters.includes(firstLetter)) {
            firstLetters.push(firstLetter);
        }
    }
    firstLetters.sort();
    let contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    showContactList(contactList, firstLetters);
}


/**
 * Creates the contact list
 * @param {*} contactList 
 * @param {*} firstLetters 
 */
function showContactList(contactList, firstLetters) {
    for (let i = 0; i < firstLetters.length; i++) {
        const firstLetter = firstLetters[i];
        contactList.innerHTML += showContactFirstLettersHTML(firstLetter);
        for (let j = 0; j < contacts.length; j++) {
            const contact = contacts[j];
            let contactFirstLetter = contact.lastName.charAt(0).toLowerCase();
            if (contactFirstLetter === firstLetter) {
                contactList.innerHTML += generateContactList(contact, j);
            }
        }
    }
}


/**
 * Show contact details
 * @param {*} i 
 */
function showContactDetails(i) {
    let contactSelection = document.getElementById('contactSelection');
    contactSelection.innerHTML = '';
    let selectedContact = contacts[i];
    contactSelection.innerHTML += showContactDetailsHTML(selectedContact, i);
    document.getElementById('contactOverlay').classList.add('show-contact-selection-overlay');
}


/**
 * Close contact details
 */
function closeContactOverlay(){
    /*this.overlayMenu.classList.remove('show-overlay-menu');*/
    document.getElementById('contactOverlay').classList.remove('show-contact-selection-overlay');
}


/**
 * Delete contact from array, save to server and reload contact list
 */
async function deleteContacts() {
    contacts.pop();
    backend.setItem('contacts', JSON.stringify(contacts));
    updateContactList();
}


/**
 * Update contact list and load contacts
 */
function updateContactList() {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    loadContacts();
}


/**
 * Reset input fields
 */
function resetInputFields() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('color').value = '';
}


/**
 * Update contact in array, save to server and reload contact list
 * Close contact form
 */
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


/**
 * Show contact form
 */
function showContactForm() {
    var contactForm = document.getElementById("contactForm");
    contactForm.classList.remove("d-none");
}


/**
 * Open contact form to add new contact
 */
function openAddContactForm() {
    let contactForm = document.getElementById("contactForm");
    contactForm.classList.remove("d-none");
}


/**
 * Close contact form to add new contact
 */
function closeAddContactForm() {
    let contactForm = document.getElementById("contactForm");
    contactForm.classList.add("d-none");
}


/**
 * Open contact form to edit contact
 * @param {*} i 
 */
function editContact(i) {
    selectedContact = contacts[i];
    const formEditContainer = document.getElementById("formContainer");
    formEditContainer.innerHTML += openEditContactFormHTML(selectedContact);
}


/**
 * Open contact form to add new task
 * @param {*} i 
 */
function addTaskContact(i) {
    selectedContact = contacts[i]; 
    const formTaskContainer = document.getElementById("formContainer");
    formTaskContainer.innerHTML += openAddTaskContactFormHTML(selectedContact);
}


/**
 * Close contact form
 */
function closeForm() {
    const contactForm = document.getElementById("contactForm");
    contactForm.remove();
}


/**
 * Close contact form to add new task
 */
function closeAddTaskForm() {
    const contactForm = document.getElementById("formTaskContainer");
    contactForm.remove();
}