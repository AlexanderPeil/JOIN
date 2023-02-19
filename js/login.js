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
        checkRememberMe(currentUser);
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
        showSentEmailMessage();
        setNewPassword(currentUser);
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


function showSentEmailMessage() {
    let showMessage = document.getElementById('email-sent');
    let hideSpan = document.getElementById('forgot-pw-span');

    showMessage.classList.remove('d-none');
    hideSpan.classList.add('d-none');

    setTimeout(function() {
        window.location.href = 'reset_password.html';
    }, 3000);
}


function showFailMessage() {
    let showMessage = document.getElementById('fail-message');
    let hideSpan = document.getElementById('forgot-pw-span');

    hideSpan.classList.add('d-none');
    showMessage.classList.remove('d-none'); 
    setTimeout(function() {
        hideSpan.classList.remove('d-none');
        showMessage.classList.add('d-none'); 
    }, 3000);
} 


function setNewPassword(password) {
    let newPassword = document.getElementById('new-password').value;
    let confirmPassword = document.getElementById('repeat-new-password').value;

    if (newPassword == confirmPassword && currentUser == users['email']) {
        users['password'].push(newPassword);
    } else {
        
    }
}