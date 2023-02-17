// Added users
let users = [];
let currentUser;
let currentUserEmail = localStorage.getItem('userLoggedInEmail');


// Function is added to body with onload. It fetches the user data from the backend server
async function laodUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


// Show the popup menu for logout
function showLogout() {
    let logOut = document.getElementById('popup-menu');
    logOut.classList.remove('d-none');
}


// Close the logout popup menu by clicking outside
function closeLogoutMenu() {
    let logOut = document.getElementById('popup-menu');
    logOut.classList.add('d-none');
}


// Prevent close the logout menu by clicking on it
function dontClose(event) {
    event.stopPropagation();
}


function getCurrentUser() {
    currentUser = users.find(user => user.email == currentUserEmail);
}