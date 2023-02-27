// Test-JSON for Add-Task
let tasksTest = [
    {
        'split': 'to_do',
        'category': 'Design',
        'body_header': 'Website redesign',
        'body_content': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, eveniet reiciendis ea eaque veritatis ipsam repellat explicabo ab, ex aliquam accusamus consequatur, neque sit. Impedit delectus sequi rem quisquam eaque!',
        'progress': [1, 2],
        'users': ["SM", "PD", "EF"],
        'priotity': "assets/img/low_priotity.png",
        'date':"2023-02-28",
        'subtasks':''
    },
    {
        'split': 'in_progress',
        'category': 'Sales',
        'body_header': 'Website redesign',
        'body_content': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        'progress': [],
        'users': ["SM", "MV", "EF"],
        'priotity': 'assets/img/medium_priotity.png',
        'date':'2023-02-26',
        'subtasks':''
    },
    {
        'split': 'awaiting_feedback',
        'category': 'Backoffice',
        'body_header': 'Website redesign',
        'body_content': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        'progress': [],
        'users': ["SM", "EF"],
        'priotity': 'assets/img/low_priotity.png',
        'date':'2023-03-28',
        'subtasks':''
    },
    {
        'split': 'awaiting_feedback',
        'category': 'Media',
        'body_header': 'Website redesign',
        'body_content': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        'progress': [],
        'users': ["SM", "PD", "EF"],
        'priotity': 'assets/img/medium_priotity.png',
        'date':'2023-02-28',
        'subtasks':''
    },
    {
        'split': 'done',
        'category': 'Marketing',
        'body_header': 'Website redesign',
        'body_content': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        'progress': [3, 3],
        'users': ["SM", "MV", "EF"],
        'priotity': 'assets/img/high_priotity.png',
        'date':'2023-02-23',
        'subtasks':''
    }
];

currentCategory = '';
let contacts = loadContacts();

let priotity_urgent = false;
let priotity_medium = false;
let priotity_low = true;

async function init() {
    includeHTML();
    loadNotes();
    addAssignedToList();
}

/*********Change button color of prio**********/

/*Change urgent button to red*/
function showUrgentRedBtn() {
    let urgentBtnWhite = document.getElementById('urgentBtnWhite');
    let urgentBtnRed = document.getElementById('urgentBtnRed');
    let mediumBtnWhite = document.getElementById('mediumBtnWhite');
    let mediumBtnOrange = document.getElementById('mediumBtnOrange');
    let lowBtnWhite = document.getElementById('lowBtnWhite');
    let lowBtnGreen = document.getElementById('lowBtnGreen');

    if (getComputedStyle(urgentBtnWhite).getPropertyValue('background-color') === 'rgb(255, 255, 255)') {
        urgentBtnWhite.classList.add('d-none');
        mediumBtnOrange.classList.add('d-none');
        lowBtnGreen.classList.add('d-none');
        urgentBtnRed.classList.remove('d-none');
        mediumBtnWhite.classList.remove('d-none');
        lowBtnWhite.classList.remove('d-none');
    }
}

/*Change urgent button to white*/
function showUrgentWhiteBtn() {
    let urgentBtnWhite = document.getElementById('urgentBtnWhite');
    let urgentBtnRed = document.getElementById('urgentBtnRed');
    if (getComputedStyle(urgentBtnRed).getPropertyValue('background-color') === 'rgb(255, 61, 0)') {
        urgentBtnRed.classList.add('d-none');
        urgentBtnWhite.classList.remove('d-none');
    }
}


/*Change medium button to orange*/
function showMediumOrangeBtn() {
    let urgentBtnWhite = document.getElementById('urgentBtnWhite');
    let urgentBtnRed = document.getElementById('urgentBtnRed');
    let mediumBtnWhite = document.getElementById('mediumBtnWhite');
    let mediumBtnOrange = document.getElementById('mediumBtnOrange');
    let lowBtnWhite = document.getElementById('lowBtnWhite');
    let lowBtnGreen = document.getElementById('lowBtnGreen');

    if (getComputedStyle(mediumBtnWhite).getPropertyValue('background-color') === 'rgb(255, 255, 255)') {
        mediumBtnWhite.classList.add('d-none');
        mediumBtnOrange.classList.remove('d-none');
        lowBtnGreen.classList.add('d-none');
        urgentBtnRed.classList.add('d-none');
        urgentBtnWhite.classList.remove('d-none');
        lowBtnWhite.classList.remove('d-none');
    }
}

/*Change medium button to white*/
function showMediumWhiteBtn() {
    let mediumBtnWhite = document.getElementById('mediumBtnWhite');
    let mediumBtnOrange = document.getElementById('mediumBtnOrange');

    if (getComputedStyle(mediumBtnOrange).getPropertyValue('background-color') === 'rgb(255, 168, 0)') {
        mediumBtnWhite.classList.remove('d-none');
        mediumBtnOrange.classList.add('d-none');
    }
}

/*Change low button to green*/
function showLowGreenBtn() {

    let urgentBtnWhite = document.getElementById('urgentBtnWhite');
    let urgentBtnRed = document.getElementById('urgentBtnRed');
    let mediumBtnWhite = document.getElementById('mediumBtnWhite');
    let mediumBtnOrange = document.getElementById('mediumBtnOrange');
    let lowBtnWhite = document.getElementById('lowBtnWhite');
    let lowBtnGreen = document.getElementById('lowBtnGreen');

    if (getComputedStyle(lowBtnWhite).getPropertyValue('background-color') === 'rgb(255, 255, 255)') {
        mediumBtnWhite.classList.remove('d-none');
        mediumBtnOrange.classList.add('d-none');
        lowBtnGreen.classList.remove('d-none');
        urgentBtnRed.classList.add('d-none');
        urgentBtnWhite.classList.remove('d-none');
        lowBtnWhite.classList.add('d-none');
    }
}

/*Change low button to white*/
function showLowWhiteBtn() {
    let lowBtnWhite = document.getElementById('lowBtnWhite');
    let lowBtnGreen = document.getElementById('lowBtnGreen');

    if (getComputedStyle(lowBtnGreen).getPropertyValue('background-color') === 'rgb(122, 226, 41)') {
        lowBtnWhite.classList.remove('d-none');
        lowBtnGreen.classList.add('d-none');
    }
}

//Fill the JSON (at Moment Test-JSON Local)

async function addTask() {
    let title = document.getElementById('title_textfield').value;
    let description = document.getElementById('description_textfield').value;
    let category = currentCategory;
    let assigned_to = [];
    let due_date = document.getElementById('date').value;
    let new_task;

    for (let i = 0; i < contacts.length; i++) {
        if(document.getElementById('assigned-to-'+i).checked){
            user = document.getElementById('assigned-to-'+i).value;
            console.log(user);
            assigned_to.push(user);
        }
        
    }

    new_task = {
        'split': 'to_do',
        'category': category,
        'body_header': title,
        'body_content': description,
        'progress': '',
        'users': assigned_to,
        'priotity': checkPrioity(),
        'date':due_date,
        'subtasks':''
    }

    tasksTest.push(new_task);
    await saveNotes();

    //window.location.href='../board.html'
}

function changeColor() {
    priotity_urgent = document.getElementById('urgentBtn').checked;
    priotity_medium = document.getElementById('mediumBtn').checked;
    priotity_low = document.getElementById('lowBtn').checked;

    if (priotity_urgent) {
        document.getElementById('urgentSection').innerHTML = `
        Urgent<img
        src="assets/img/Prio-urgent-white.png"></label>
        `;
        document.getElementById('mediumSection').innerHTML = `
        Medium<img
        src="assets/img/Prio-medium.png"></label>
        `;
        document.getElementById('lowSection').innerHTML = `
        Low<img
        src="assets/img/Prio-low.png"></label>
        `;
    }
    if (priotity_medium) {
        document.getElementById('urgentSection').innerHTML = `
        Urgent<img
        src="assets/img/Prio-urgent.png"></label>
        `;
        document.getElementById('mediumSection').innerHTML = `
        Medium<img
        src="assets/img/prio-medium-white.png"></label>
        `;
        document.getElementById('lowSection').innerHTML = `
        Low<img
        src="assets/img/Prio-low.png"></label>
        `;

    }
    if (priotity_low) {
        document.getElementById('urgentSection').innerHTML = `
        Urgent<img
        src="assets/img/Prio-urgent.png"></label>
        `;
        document.getElementById('mediumSection').innerHTML = `
        Medium<img
        src="assets/img/Prio-medium.png"></label>
        `;
        document.getElementById('lowSection').innerHTML = `
        Low<img
        src="assets/img/Prio-low-white.png"></label>
        `;

    }

    console.log('Hoch: ' + priotity_urgent + ' Mittel: ' + priotity_medium + ' Niedrig: ' + priotity_low);
}

function checkPrioity(){
    let prio;

    if(priotity_low){
        prio = "assets/img/low_priotity.png";
    }
    else if(priotity_medium){
        prio ="assets/img/medium_priotity.png";
    }
    else if(priotity_urgent){
        prio = "assets/img/high_priotity.png";
    }

    return prio;
}

async function saveNotes() {
    let tasksAsJson = JSON.stringify(tasksTest);
    await backend.setItem('allTasks', tasksAsJson);
}

async function loadNotes() {
    await downloadFromServer();
    tasksTest = JSON.parse(backend.getItem('allTasks')) || [];
}

async function loadContacts(){
    let response = await fetch('./js/contact.json');
    contacts = await response.json();
}

function addAssignedToList(){
    document.getElementById('assigned-to-choices').innerHTML = '';
    // document.getElementById('assigned-to-choices').innerHTML += `<select id=assigned-test></select>`;
    
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstName = contact['firstName'];
        let lastName = contact['lastName'];
        let acronym = firstName[0]+lastName[0];

        console.log('Vorname: ' + firstName + ' | Nachname: ' + lastName + ' | Abkürzung: ' + acronym);

        document.getElementById('assigned-to-choices').innerHTML += `<div class="assigned-to-line"><label for="assigned-to-${i}">${firstName + ' ' + lastName }</label><input type="checkbox" id="assigned-to-${i}" value="${acronym}"></div>`
    }
}


function openDropdown(id){
    if(document.getElementById(id).classList.contains('d-none')) {
    document.getElementById(id).classList.remove('d-none');
}
    else if(!document.getElementById(id).classList.contains('d-none')) {
        document.getElementById(id).classList.add('d-none');}
}


function changeCategoryHeader(name){
    document.getElementById('category-header').innerHTML = name;
    currentCategory = name;
}