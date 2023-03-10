let tasks = [];
let users_color = loadContacts();
let contacts = loadContacts();

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

let currentCategory = '';
let subtasks = [];

let priotity_urgent = false;
let priotity_medium = false;
let priotity_low = true;




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
        <div class="card" id=card${i} draggable="true" ondragstart="startDragging(${i})" ondragend="endDragging(${i})" onclick="openTaskFull(${i})">
                        <div class="card-content">
                            <div class="card-head" style="background-color: var(--${catgoryLow});">${(task['category'])}</div>
                            <div class="card-body">
                                <h4>${task['body_header']}</h4>
                                <p>${task['body_content']}</p>
                            </div>`

        if (task['subtasks'].length > 0) {
            let doneTasks = 0;
            let sumTasks = task['subtasks'].length;
            for (let t = 0; t < task['subtasks'].length; t++) {
                const subtask = task['subtasks'][t];
                if (subtask['status'] == 'done') {
                    doneTasks++;
                };

            }

            document.getElementById('card' + i).innerHTML += `
                            <div class="progress_bar">
                                <div style="width: 70%; background-color: lightgrey; border-radius: 3px;">
                                    <div style="background: #0D99FF; height:12px;width:${doneTasks / sumTasks * 100}%; border-radius: 3px;"></div>
                                </div>
                                <div>${doneTasks}/${sumTasks} Done</div>
                            </div>`
        }
        document.getElementById('card' + i).innerHTML += `
                            <div class="priotity_users">
                                <div class="users" id="users${i}">
                                </div>
                                <div class="priotity"><img src="${task['priotity'][0]['img']}" alt=""></div>
                            </div>

                        </div>

                    </div>

        
        `;
        for (let j = 0; j < task['users'].length; j++) {
            const user = task['users'][j];

            document.getElementById('users' + i).innerHTML += `<p class="circle" style="background-color: blue;">${user['userShort']}</p>`
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

function openTaskFull(choiceTask) {
    document.getElementById('popUp').innerHTML = `
    <div class="popUp-background">
            <div class="popUp-content">
                <div class="popUp-close" onclick="closePopUp(${choiceTask})">x</div>
                <div class="card-head" style="background-color: var(--${tasks[choiceTask]['category'].toLowerCase()});">${tasks[choiceTask]['category']}</div>
                <h2>${tasks[choiceTask]['body_header']}</h2>
                <p>${tasks[choiceTask]['body_content']}</p>
                
                <div id=subtaskSectionCheck>
                <label><b>Subtasks</b></label>
                <section class="subtaskSection" id="subtaskSection">
                </section></div>
                <div class="makeRow"><b class="margin10">Due Date: </b><p>${tasks[choiceTask]['date']}</p></div>
                <div class="makeRow"><b class="margin10">Priority: </b><p class="prio-${tasks[choiceTask]['priotity'][0]['priotity']}-popUp">${tasks[choiceTask]['priotity'][0]['priotity']} <img src="${tasks[choiceTask]['priotity'][0]['img_white']}"></p></div>
                <div class="makeRow"><b class="margin10">Assigned To: </b></div>
                <div class="users makeColumn" id="userSection"></div>
                <div class="put_it_right"><img src="./assets/img/empty-trash-32.png" onclick=delCard(${choiceTask})></div>
            </div>
        </div>    
    `
    if (tasks[choiceTask]['subtasks'].length > 0) {
        let subtasks = tasks[choiceTask]['subtasks']

        for (let i = 0; i < subtasks.length; i++) {
            taskDone = 'checked'
            if (tasks[choiceTask]['subtasks'][i]['status'] == 'undone') {
                taskDone = '';
            }
            document.getElementById('subtaskSection').innerHTML += `
            <label for="subtask_${i}">${tasks[choiceTask]['subtasks'][i]['subtaskName']}<input type="checkbox" ${taskDone} id="subtask_${i}"></label>
            `
        }

    }
    else {
        document.getElementById('subtaskSectionCheck').innerHTML = '';
    }
    if (tasks[choiceTask]['users'].length > 0) {
        let users = tasks[choiceTask]['users']
        for (let u = 0; u < users.length; u++) {
            document.getElementById('userSection').innerHTML += `<div class="makeRow">
            <p class="circle" style="background-color: blue; margin-right: 20px;">${users[u]['userShort']}</p><p>${users[u]['userFullName']}</p>
            </div>`
        }
    }
}

async function closePopUp(currentCard) {
    for (let i = 0; i < tasks[currentCard]['subtasks'].length; i++) {
        let subTask = tasks[currentCard]['subtasks'][i];
        let isDone = false;
        isDone = document.getElementById('subtask_' + i).checked;
        console.log('Task ist: ', isDone);
        if (isDone) {
            tasks[currentCard]['subtasks'][i]['status'] = 'done';
        }
        else {
            tasks[currentCard]['subtasks'][i]['status'] = 'undone';

        }

    }
    await saveNotes();
    document.getElementById('popUp').innerHTML = '';
    loadBoard();
}

async function delCard(choicCard) {
    console.log(choicCard);
    tasks.splice(choicCard, 1);
    await saveNotes();
    document.getElementById('popUp').innerHTML = '';
    loadBoard();
}

function openAddTask() {
    document.getElementById('popUp').innerHTML = `
    <div class="popUp-background">
            <div class="popUp-content_add_task">
            <div class="headerPopUp"><h2>Add Task</h2><div style="cursor: pointer;" onclick="closePopUpAddTask()">x</div></div>
    <form onsubmit="addTask();return false">
    <div class="content-container">
        <div class="left-container">
            <div class="selection-container">
                <label>Title</label>
                <input placeholder="Enter a title" id="title_textfield" required>
            </div>
            <div class="selection-container">
                <label>Description</label>
                <textarea placeholder="Enter a description" id="description_textfield" required></textarea>
            </div>
            <div class="selection-container prevent-select">
                <label>Category</label>
                <div class="select-wrapper" onclick="openDropdown('category-choices')">
                    <div class="sector_top">
                        <p id="category-header">Select your Category</p><img src="./assets/img/arrow_down.png">
                    </div>
                    <div class="category-choices d-none" id="category-choices">
                        <div class="category" onclick="changeCategoryHeader('Marketing')">
                            <div id="marketing">Marketing </div>
                            <div class="circle" style="background: #0038ff;"></div>
                        </div>
                        <div class="category" onclick="changeCategoryHeader('Media')">
                            <div>Media </div>
                            <div class="circle" style="background: #ffc702;"></div>
                        </div>
                        <div class="category" onclick="changeCategoryHeader('Backoffice')">
                            <div>Backoffice </div>
                            <div class="circle" style="background: #1FD7C1;"></div>
                        </div>
                        <div class="category" onclick="changeCategoryHeader('Design')">
                            <div>Design </div>
                            <div class="circle" style="background:  #ff7a00;"></div>
                        </div>
                        <div class="category" onclick="changeCategoryHeader('Sales')">
                            <div>Sales </div>
                            <div class="circle" style="background: #fc71ff;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="selection-container prevent-select">
                <label>Assigned To</label>
                <div class="select-wrapper assigned-to-wrapper">
                    <div class="sector_top" onclick="openDropdown('assigned-to-choices')">
                        <p id="assigned-to-header">Select your Members</p><img
                            src="./assets/img/arrow_down.png">
                    </div>
                    <div class="assigned-to-choices d-none" id="assigned-to-choices">
                        <div class="assigned-to" onclick="changeCategoryHeader('Marketing')">
                            <div id="marketing">Marketing </div>
                            <div class="circle" style="background: #0038ff;"></div>
                        </div>
                        <div class="assigned-to" onclick="changeCategoryHeader('Media')">
                            <div>Media </div>
                            <div class="circle" style="background: #ffc702;"></div>
                        </div>
                        <div class="assigned-to" onclick="changeCategoryHeader('Backoffice')">
                            <div>Backoffice </div>
                            <div class="circle" style="background: #1FD7C1;"></div>
                        </div>
                        <div class="assigned-to" onclick="changeCategoryHeader('Design')">
                            <div>Design </div>
                            <div class="circle" style="background:  #ff7a00;"></div>
                        </div>
                        <div class="assigned-to" onclick="changeCategoryHeader('Sales')">
                            <div>Sales </div>
                            <div class="circle" style="background: #fc71ff;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle-gap"></div>
        <div class="right-container">
            <div class="features-container">
                <label for="date">Due Date</label>
                <input class="date" type="date" id="date" name="date" required>
            </div>
            <div class="features-container">
                <label>Prio</label>
                <div onchange="changeColor(); return false" class="prio-btn-container">

                    <input type="radio" class="checkbox_urgen" id="urgentBtn" name="radio">
                    <label for="urgentBtn" class="prio-btn prio-urgent urgentSection" for="checkbox_urgen"
                        id="urgentSection">
                        Urgent<img id="prioUrgentWhite" src="assets/img/Prio-urgent.png">
                    </label>
                    <input type="radio" class="checkbox_medium" id="mediumBtn" name="radio">
                    <label for="mediumBtn" class="prio-btn prio-urgent mediumSection" for="checkbox_urgen"
                        id="mediumSection">
                        Medium<img id="prioUrgentWhite" src="assets/img/Prio-medium.png">
                    </label>
                    <input type="radio" class="checkbox_low" id="lowBtn" name="radio" checked>
                    <label for="lowBtn" class="prio-btn prio-urgent lowSection" for="checkbox_urgen"
                        id="lowSection">
                        Low<img id="prioUrgentWhite" src="assets/img/prio-low-white.png">
                    </label>
                </div>



                <div class="features-container">
                    <label>Subtasks</label>
                    <div class="subtask-container">
                        <input class="subtask-input" onclick="inputChangeSubIcons()"placeholder="Add new subtask" id="subtask">
                        <img id="plusSubtaskImg" class="plus-icon" src="assets/img/plus-icon.png" onclick="changeSubIcon()">
                        <div class="subtask-img-container">
                        <img id="clearSubtaskImg" src="assets/img/icon_cancel_subtask.svg" onclick="clearSubtask()" class="subtask-icons d-none">
                        <div class="gap-img-subtask"></div>
                        <img id="addSubtaskImg" src="assets/img/icon_check_subtask.svg" onclick="addSubtask()" class="subtask-icons d-none">
                        </div>
                    </div>
                    <div>
                        <ul id="subtask-list">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="submit-and-clear">
            <div class="btn-clear" onclick="clearAll()">Clear<img class="clear-img" src ="assets/img/iconoir_cancel.svg"></div>
                <div><Button class="btn-createTask">Create Task<img src ="assets/img/akar-icons_check.svg"></Button></div>
            </div>
        </div>
    </div>
</form>
</div>
        </div>
`

addAssignedToList();
}

function openDropdown(id) {
    if (document.getElementById(id).classList.contains('d-none')) {
        document.getElementById(id).classList.remove('d-none');
    }
    else if (!document.getElementById(id).classList.contains('d-none')) {
        document.getElementById(id).classList.add('d-none');
    }
}

async function loadContacts() {
    let response = await fetch('./js/contact.json');
    contacts = await response.json();
}

function addAssignedToList() {
    document.getElementById('assigned-to-choices').innerHTML = '';
    // document.getElementById('assigned-to-choices').innerHTML += `<select id=assigned-test></select>`;

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstName = contact['firstName'];
        let lastName = contact['lastName'];
        let acronym = firstName[0] + lastName[0];

        console.log('Vorname: ' + firstName + ' | Nachname: ' + lastName + ' | Abkürzung: ' + acronym);

        document.getElementById('assigned-to-choices').innerHTML += `<div class="assigned-to-line"><label for="assigned-to-${i}" id="assigned_name${i}">${firstName + ' ' + lastName}</label><input type="checkbox" id="assigned-to-${i}" value="${acronym}"></div>`
    }
}

function inputChangeSubIcons() {
    document.getElementById('plusSubtaskImg').classList.add('d-none');
    document.getElementById('clearSubtaskImg').classList.remove('d-none');
    document.getElementById('addSubtaskImg').classList.remove('d-none');
}

function addSubtask() {
    let subtask = document.getElementById('subtask').value;
    if (!subtask == '') {
        document.getElementById('subtask-list').innerHTML += `<li>${subtask}</li>`;
        document.getElementById('subtask').value = '';
        subtasks.push({
            'subtaskName': subtask,
            'status': 'undone'
        });
    }
    document.getElementById('plusSubtaskImg').classList.remove('d-none');
    document.getElementById('clearSubtaskImg').classList.add('d-none');
    document.getElementById('addSubtaskImg').classList.add('d-none');

}

function clearSubtask() {
    document.getElementById('subtask').value ="";
    document.getElementById('plusSubtaskImg').classList.remove('d-none');
    document.getElementById('clearSubtaskImg').classList.add('d-none');
    document.getElementById('addSubtaskImg').classList.add('d-none');

}

function changeSubIcon() {
    document.getElementById('plusSubtaskImg').classList.add('d-none');
    document.getElementById('clearSubtaskImg').classList.remove('d-none');
    document.getElementById('addSubtaskImg').classList.remove('d-none');
}

async function addTask() {
    let title = document.getElementById('title_textfield').value;
    let description = document.getElementById('description_textfield').value;
    let category = currentCategory;
    let assigned_to = [];
    let due_date = document.getElementById('date').value;
    let new_task;

    for (let i = 0; i < contacts.length; i++) {
        if (document.getElementById('assigned-to-' + i).checked) {
            user = document.getElementById('assigned-to-' + i).value;
            let fullName = document.getElementById('assigned_name' + i).innerHTML;
            console.log(user);
            console.log(fullName);
            assigned_to.push({'userShort':user,'userFullName':fullName});
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
        'date': due_date,
        'subtasks': subtasks
    }

    tasks.push(new_task);
    await saveNotes();
    subtasks = [];

    window.location.href = './board.html'
}

function checkPrioity() {
    let prio;
    let priotity;

    if (priotity_low) {
        prio = "assets/img/low_priotity.png";
        priotity = 'low';
        
    }
    else if (priotity_medium) {
        prio = "assets/img/medium_priotity.png";
        priotity = 'medium';
    }
    else if (priotity_urgent) {
        prio = "assets/img/high_priotity.png";
        priotity = 'urgent';
    }

    return [{'img':prio,'priotity':priotity,"img_white":"assets/img/Prio-"+priotity+"-white.png"}];
}

function closePopUpAddTask(){
    document.getElementById('popUp').innerHTML = '';
}
function clearAll(){
    document.getElementById('title_textfield').value = '';
    document.getElementById('description_textfield').value = '';
    document.getElementById('category-header').innerHTML = 'Select your Category';
    for (let i = 0; i < contacts.length; i++) {
        if (document.getElementById('assigned-to-' + i).checked) {
            document.getElementById('assigned-to-' + i).checked = false;
        }

    }
    document.getElementById('date').value = '';
    document.getElementById('subtask-list').innerHTML = '';
}