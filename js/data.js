let users = [
    {
        'name': 'Max',
        'email': 'max@test.de',
        'password': 'test1234'
    },
    {
        'name': 'Alex',
        'email': 'alex@test.de',
        'password': 'test4321'
    }
];


async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}