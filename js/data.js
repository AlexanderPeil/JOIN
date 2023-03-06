let users = [];
let currentUser;


// Body onload function
function init() {
    includeHTML();
}


// Function is added to body with onload. It fetches the user data from the backend server
async function loadUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    currentUser = JSON.parse(backend.getItem('current-user')) || [];
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


// Logout and delete the current user 
 async function logOut() {
    await backend.deleteItem('current-user');
    window.location.href = 'index.html';
}


// Check if the remember me checkbox is checked
function checkRememberMe(currentUser) {
    let rememberMe = document.getElementById('remember-me');
    
    if (rememberMe.checked == true) {
        setRememberMeLocal(currentUser);
    }
}


// If you uncheck remember me so the current user will be removed from local storage and the login data won't be saved for the next time
function deleteRememberMe() {
    let rememberMe = document.getElementById('remember-me');

    if (rememberMe.checked == false) {
        localStorage.removeItem('current-email');
        localStorage.removeItem('current-password');
    }
}


//  If the checkbox is checked the login data will be saved for the next time (saave the current user in the local storage)
function setRememberMeLocal(currentUser) {
    localStorage.setItem('current-email', currentUser.email);
    localStorage.setItem('current-password', currentUser.password);
}


// Get email from current user by checking remember me checkbox
function getRememberMeEmail() {
    return localStorage.getItem('current-email');
}


// Get password from current user by checking remember me checkbox
function getRememberMePassword() {
    return localStorage.getItem('current-password');
}


// Body onload function. Every time if the join main page is loaded this function checks the remember me email and password data
function checkRememberMeData() {
    let emailValue = getRememberMeEmail();
    let passswordValue = getRememberMePassword();

    if (getRememberMeEmail()) {
        document.getElementById('email').value = emailValue;
        document.getElementById('password').value = passswordValue;
    }
}