let users = [{
    'name': 'Paul',
    'emaill': 'paul@test.de',
    'password': 'test1'
}];


// Function is added to body with onload. It fetches the user data from the backend server
async function laodUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}