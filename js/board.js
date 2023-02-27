let tasks = [];
let users_color = loadContacts();

let currentDraggedElement;

async function init() {
    includeHTML();
    await loadNotes();
    loadBoard();
}

function loadBoard() {

    cleanOldBoard();
    loadNewBoard();
    addDropArea();
}




function cleanOldBoard() {
    document.getElementById('to_do').innerHTML = '';
    document.getElementById('in_progress').innerHTML = '';
    document.getElementById('awaiting_feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    console.log('Board wurde erfolgreich geleert')
}

function loadNewBoard() {

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let catgoryLow = task['category'].toLowerCase();

        document.getElementById(task['split']).innerHTML += `
        <div class="card" id=card${i} draggable="true" ondragstart="startDragging(${i})" ondragend="endDragging(${i})">
                        <div class="card-content">
                            <div class="card-head" style="background-color: var(--${catgoryLow});">${(task['category'])}</div>
                            <div class="card-body">
                                <h4>${task['body_header']}</h4>
                                <p>${task['body_content']}</p>
                            </div>`

        if (task['progress'].length > 0) {
            document.getElementById('card' + i).innerHTML += `
                            <div class="progress_bar">
                                <div style="width: 70%; background-color: lightgrey; border-radius: 3px;">
                                    <div style="background: #0D99FF; height:12px;width:${task['progress'][0] / task['progress'][1] * 100}%; border-radius: 3px;"></div>
                                </div>
                                <div>${task['progress'][0]}/${task['progress'][1]} Done</div>
                            </div>`
        }
        document.getElementById('card' + i).innerHTML += `
                            <div class="priotity_users">
                                <div class="users" id="users${i}">
                                </div>
                                <div class="priotity"><img src="${task['priotity']}" alt=""></div>
                            </div>

                        </div>

                    </div>

        
        `;
        for (let j = 0; j < task['users'].length; j++) {
            const user = task['users'][j];

            document.getElementById('users' + i).innerHTML += `<p style="background-color: blue;">${user}</p>`
        }

    }

    console.log('Board wurde neu erstellt.')
}


function addDropArea() {
    let addDrop = `<div class="dropArea" id="dropArea" ondrop="moveTo('to_do')" ondragover="allowDrop(event)" ondragleave="diableDrop(event)"></div>`;

    document.getElementById('to_do').innerHTML += `<div class="dropArea" id="dropArea_to_do" ondrop="moveTo('to_do')" ondragover="allowDrop(event, 'to_do')" ondragleave="diableDrop('to_do')"></div>`;
    document.getElementById('in_progress').innerHTML += `<div class="dropArea" id="dropArea_in_progress" ondrop="moveTo('in_progress')" ondragover="allowDrop(event, 'in_progress')" ondragleave="diableDrop('in_progress')"></div>`;
    document.getElementById('awaiting_feedback').innerHTML += `<div class="dropArea" id="dropArea_awaiting_feedback" ondrop="moveTo('awaiting_feedback')" ondragover="allowDrop(event, 'awaiting_feedback')" ondragleave="diableDrop('awaiting_feedback')"></div>`;
    document.getElementById('done').innerHTML += `<div class="dropArea" id="dropArea_done" ondrop="moveTo('done')" ondragover="allowDrop(event, 'done')" ondragleave="diableDrop('done')"></div>`;
}


function startDragging(id) {
    currentDraggedElement = id;
    //document.getElementById('card'+id).classList.add('d-none');
    //document.getElementById('card'+id).style.transform = "rotate(10deg)";
}

function allowDrop(ev, test) {
    ev.preventDefault();
    document.getElementById('dropArea_' + test).classList.add('borders');
}

function diableDrop(ev) {

    document.getElementById('dropArea_' + ev).classList.remove('borders');
}

async function moveTo(category) {
    tasks[currentDraggedElement]['split'] = category;
    loadBoard();
    await saveNotes();
}

function endDragging(id) {
    document.getElementById('card' + id).style.transform = "rotate(0deg)";
}

async function loadNotes() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('allTasks')) || [];
}

async function saveNotes() {
    let tasksAsJson = JSON.stringify(tasks);
    await backend.setItem('allTasks', tasksAsJson);
}

async function loadContacts() {
    let response = await fetch('./js/contact.json');
    users_color = await response.json();
}