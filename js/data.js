let users = [];
let currentUser;


function init() {
    includeHTML();
}


// Function is added to body with onload. It fetches the user data from the backend server
async function loadUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    currentUser = JSON.parse(backend.getItem('current-user')) || [];

    // checkRememberMeData();
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


 async function logOut() {
    await backend.deleteItem('current-user');
    window.location.href = 'index.html';
}


function checkRememberMe(currentUser) {
    let rememberMe = document.getElementById('remember-me');
    
    if (rememberMe.checked == true) {
        setRememberMeLocal(currentUser);
    }
}


function setRememberMeLocal(currentUser) {
    localStorage.setItem('current-email', currentUser.email);
    localStorage.setItem('current-password', currentUser.password);
}


function getRememberMeEmail() {
    return localStorage.getItem('current-email');
}


function getRememberMePassword() {
    return localStorage.getItem('current-password');
}


function checkRememberMeData() {
    let emailValue = getRememberMeEmail();
    let passswordValue = getRememberMePassword();

    if (getRememberMeEmail()) {
        document.getElementById('email').value = emailValue;
        document.getElementById('password').value = passswordValue;
    }
}