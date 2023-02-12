function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    pushUser(name, email, password);
}   


function pushUser(name, email, password) {
    users.push({name: name, email:email, password: password});
    backend.setItem('users', JSON.stringify(users));

    successfullyRegistration();
}


function successfullyRegistration() {
    let msgBox = document.getElementById('msg-box');
    msgBox.innerHTML = 'Successfully registered!';

    setTimeout(function() {
        window.location.href = 'index.html';
    }, 3000);
}