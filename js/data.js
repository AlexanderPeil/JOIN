let users = [{
    'name': 'Paul',
    'emaill': 'paul@test.de',
    'password': 'test1'
}];

let guest = [];


// Function is added to body with onload. It fetches the user data from the backend server
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}