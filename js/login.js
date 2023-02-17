// Get value from email and password input and compare this data with the registered users 
function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    currentUser = users.find(u => u.email == email && u.password == password);
    let invalidLogin = document.getElementById('invalid-login');
    let hideUnderline = document.getElementById('hide-underline');

    checkUser(invalidLogin, hideUnderline);
}


// Login with right email and password continues on the page summary. Invalid login-data triggers text
function checkUser(invalidLogin, hideUnderline) {
    if (currentUser) {
        currentUserLocal(currentUser);
        window.location.href = 'summary.html';
    } else {
        hideUnderline.classList.add('d-none');
        invalidLogin.classList.remove('d-none');
        setTimeout(function() {
            invalidLogin.classList.add('d-none');
            hideUnderline.classList.remove('d-none');
        }, 3000);
    }
}


// Send Email if you forget the password
function emailSent() {
    let email = document.getElementById('email-forgot-password').value;
    currentUser = users.find(u => u.email == email);

    if (currentUser) {
        currentUserLocalStorage(email);
        window.location.href = 'reset_password.html';
    } else {
        showFailMessage();
    }
}

// Login for guest. So you don't need to sign in or to log in with an account
function guestLogin() {
    currentUser = {'name' : 'Guest'};
    setGuestUserToLocal(currentUser);
    window.location.href = 'summary.html';
}


function currentUserLocalStorage(email) {
    let currentUserEmail = JSON.stringify(email);
    localStorage.setItem('current-user', currentUserEmail);
}


function showFailMessage() {
    let failMessage = document.getElementById('fail-message');
    let hideSpan = document.getElementById('forgot-pw-span');

    hideSpan.classList.add('d-none');
    failMessage.classList.remove('d-none'); 
    setTimeout(function() {
        hideSpan.classList.remove('d-none');
        failMessage.classList.add('d-none'); 
    }, 3000);
} 


function setNewPassword() {
    let currentUserEmail =  localStorage.getItem('current-user');
    currentUserEmail = users.find(u => u.password == password);
    // currentUserEmail.remove['password']
}