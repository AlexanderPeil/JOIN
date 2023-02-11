function showSignUp() {
    document.getElementById('sign-up-page').classList.remove('d-none');
    document.getElementById('login-page').classList.add('d-none');
}


function backToLogin() {
    document.getElementById('login-page').classList.remove('d-none');
    document.getElementById('forgot-pw-page').classList.add('d-none');
    document.getElementById('sign-up-page').classList.add('d-none');
}


function showForgotPw() {
    document.getElementById('forgot-pw-page').classList.remove('d-none');
    document.getElementById('login-page').classList.add('d-none');
}


function backToForgotPw() {
    document.getElementById('forgot-pw-page').classList.remove('d-none');
    document.getElementById('reset-pw-page').classList.add('d-none');
}