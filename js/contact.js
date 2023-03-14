let contacts = [];

async function initContact() {
    await includeHTML();
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    loadContacts();
}


// Add contacts to array
// Reload the contact list
// Reset the input fields
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
    updateContactList();
    resetInputFields();
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


function resetInputFields() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('color').value = '';
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


function closeAddTaskForm() {
    const contactForm = document.getElementById("formTaskContainer");
    contactForm.remove();
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