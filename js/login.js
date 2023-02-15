// Get value from email and password input and compare this data with the registered users 
function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let user = users.find(u => u.email == email && u.password == password);
    let invalidLogin = document.getElementById('invalid-login');
    let hideUnderline = document.getElementById('hide-underline');

    checkUser(user, invalidLogin, hideUnderline);
}


// Login with right email and password continues on the page summary. Invalid login-data triggers text
function checkUser(user, invalidLogin, hideUnderline) {
    if (user) {
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


/**
 * This function is used to go back to the login page from forgot password
 * 
 */
function backToLogin() {
    document.getElementById('login-page').classList.remove('d-none');
    document.getElementById('forgot-pw-page').classList.add('d-none');
    // document.getElementById('sign-up-page').classList.add('d-none');
}


/**
 * 
 * This function is used to remove the login page and to show the forgot passsword page
 */
function showForgotPw() {
    document.getElementById('forgot-pw-page').classList.remove('d-none');
    document.getElementById('login-page').classList.add('d-none');
}


/**
 * 
 * This function is used to go back from the reset password page to the forgot password game
 */
function backToForgotPw() {
    document.getElementById('forgot-pw-page').classList.remove('d-none');
    document.getElementById('reset-pw-page').classList.add('d-none');
}


// Send Email if you forget the password
function emailSent() {
    document.getElementById('forgot-pw-span').classList.add('d-none');
    document.getElementById('email-sent').classList.remove('d-none');

    setTimeout(function() {
        window.location.href = 'index.html';
    }, 3000);
}


function guestLogin() {
    window.location.href = 'summary.html';
}