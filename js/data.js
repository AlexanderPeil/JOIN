let users = [];
let currentUser;


// Function is added to body with onload. It fetches the user data from the backend server
async function laodUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];

    checkRememberMeData();
}


// Show the popup menu for logout
function showLogout() {
    let logOut = document.getElementById('popup-menu');
    logOut.classList.remove('d-none');
    localStorage.removeItem('current-user');
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


function currentUserLocal(currentUser) {
    let currentUserAsText = JSON.stringify(currentUser);
    localStorage.setItem('current-user', currentUserAsText); 
}


function setGuestUserToLocal(currentUser) {
    let guestUser = JSON.stringify(currentUser);
    localStorage.setItem('current-user', guestUser);
}


function logOut() {
    localStorage.removeItem('current-user');
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