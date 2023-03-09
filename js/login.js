// Get value from email and password input and compare this data with the registered users 
function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    currentUser = users.find(u => u.email == email.toLowerCase() && u.password == password);
    let invalidLogin = document.getElementById('invalid-login');
    let hideUnderline = document.getElementById('hide-underline');

    checkUser(invalidLogin, hideUnderline);
}


// Login with right email and password continues on the page summary. Invalid login-data triggers text "Invalid email or password!"
 async function checkUser(invalidLogin, hideUnderline) {
    if (currentUser) {
        await backend.setItem('current-user', JSON.stringify(currentUser));
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
    currentUser = users.find(u => u.email == email.toLowerCase());

    if (currentUser) {
        setUserLocal(currentUser);
        showSentEmailMessage();
    } else {
        showFailMessage();
    }
}


// Login for guest. So you don't need to sign in or to log in with an account
  async function guestLogin() {
    currentUser = {'name': 'Guest'};
    await backend.setItem('current-user', JSON.stringify(currentUser));
    window.location.href = 'summary.html';
}


// Show message if email has been sent
function showSentEmailMessage() {
    let showMessage = document.getElementById('email-sent-text');
    showMessage.classList.remove('d-none');

    setTimeout(function() {window.location.href = 'reset_password.html';
    }, 2000);
}


// Save current user to local storage to get the password
function setUserLocal(currentUser) {
    localStorage.setItem('user-email', currentUser.email);
}


// Show message if the email was wrong
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

// Reset old password and set a new one
function setNewPassword() {
    // let resetPassword = users.find(u => u.password == password);
    let newPassword = document.getElementById('new-password').value;
    let confirmPassword = document.getElementById('repeat-new-password').value;
    let hideSpan = document.getElementById('reset-pw-span');
    let showMessage = document.getElementById('reset-pw-message');
    let userPw = localStorage.getItem('reset-password');

    if (newPassword == confirmPassword && userPw == users['email']) {
        users['password'].push(newPassword);
    } else {
        hideSpan.classList.add('d-none');
        showMessage.classList.remove('d-none');
        setTimeout(function() {
        hideSpan.classList.remove('d-none');
        showMessage.classList.add('d-none');
        }, 3000);
    }
}

function animationMobileStop() {
    let animationMob = document.getElementById('animation-mobile');    

    setTimeout(function() {
        animationMob.classList.add('animation-stop');
    }, 2500);
}