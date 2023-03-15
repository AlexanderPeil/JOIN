let tasks = [];
let users_color = loadContacts();
let contacts = loadContacts();
let currentCategory = '';
let subtasks = [];
let onMobile = isMobileDevice();
let priotity_urgent = false;
let priotity_medium = false;
let priotity_low = true;
let currentDraggedElement;
let splits = ['to_do', 'in_progress', 'awaiting_feedback', 'done'];

async function init() {
    includeHTML();
    await loadNotes();
    loadBoard(tasks);
}

function loadBoard(choiceTasks) {
    cleanOldBoard();
    loadNewBoard(choiceTasks);
    addDropArea();
}

function cleanOldBoard() {
    document.getElementById('to_do').innerHTML = '';
    document.getElementById('in_progress').innerHTML = '';
    document.getElementById('awaiting_feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}

function loadNewBoard(toLoadTasks) {
    for (let i = 0; i < toLoadTasks.length; i++) {
        const task = toLoadTasks[i];
        let catgoryLow = task['category'].toLowerCase();
        document.getElementById(task['split']).innerHTML += loadCardBoardText(task, i, catgoryLow);
        loadUsers(task, i);
        loadSubtasks(task, i);
    }
}

function loadUsers(task, i) {
    for (let j = 0; j < task['users'].length; j++) {
        const user = task['users'][j];
        document.getElementById('users' + i).innerHTML += loadUserShortsTmp(user)
    }
}
function loadSubtasks(task, i) {
    if (task['subtasks'].length > 0) {
        let doneTasks = 0;
        let sumTasks = task['subtasks'].length;
        for (let t = 0; t < task['subtasks'].length; t++) {
            const subtask = task['subtasks'][t];
            if (subtask['status'] == 'done') {
                doneTasks++;
            };
        }
        document.getElementById('progress' + i).innerHTML = loadSubtaskBoardtmp(doneTasks, sumTasks);
    }
}

function addDropArea() {
    for (let i = 0; i < splits.length; i++) {
        const split = splits[i];
        document.getElementById(split).innerHTML += loadDropArea(split);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
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
    loadBoard(tasks);
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
    document.getElementById('popUp').innerHTML = loadCardFullText(tasks, choiceTask);
    loadSubtaksToFullTask(choiceTask);
    loadUsersToFullTask(choiceTask);
}
function loadSubtaksToFullTask(choiceTask) {
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
}

function loadUsersToFullTask(choiceTask) {
    if (tasks[choiceTask]['users'].length > 0) {
        let users = tasks[choiceTask]['users']
        for (let u = 0; u < users.length; u++) {
            document.getElementById('userSection').innerHTML += loadTextUsersForFullTask(users, u);
        }
    }
}

async function closePopUp(currentCard) {
    checkSubtaskDone(currentCard)
    await saveNotes();
    document.getElementById('popUp').innerHTML = '';
    loadBoard(tasks);
}

function checkSubtaskDone(currentCard) {
    for (let i = 0; i < tasks[currentCard]['subtasks'].length; i++) {
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
}

async function delCard(choicCard) {
    console.log(choicCard);
    tasks.splice(choicCard, 1);
    await saveNotes();
    document.getElementById('popUp').innerHTML = '';
    loadBoard(tasks);
}

function openAddTask() {
    document.getElementById('popUp').innerHTML = loadAddTaskTmp();
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
    document.getElementById('subtask').value = "";
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
            assigned_to.push({ 'userShort': user, 'userFullName': fullName });
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
    return [{ 'img': prio, 'priotity': priotity, "img_white": "assets/img/Prio-" + priotity + "-white.png" }];
}

function closePopUpAddTask() {
    document.getElementById('popUp').innerHTML = '';
}
function clearAll() {
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

function changeColor() {
    priotity_urgent = document.getElementById('urgentBtn').checked;
    priotity_medium = document.getElementById('mediumBtn').checked;
    priotity_low = document.getElementById('lowBtn').checked;

    if (priotity_urgent) {
        document.getElementById('urgentSection').innerHTML = loadPrioIMGWithText('Urgent','Prio-urgent-white');
        document.getElementById('mediumSection').innerHTML = loadPrioIMGWithText('Medium','Prio-medium');
        document.getElementById('lowSection').innerHTML = loadPrioIMGWithText('Low','Prio-low');
    }
    if (priotity_medium) {
        document.getElementById('urgentSection').innerHTML = loadPrioIMGWithText('Urgent','Prio-urgent');
        document.getElementById('mediumSection').innerHTML = loadPrioIMGWithText('Medium','prio-medium-white');
        document.getElementById('lowSection').innerHTML = loadPrioIMGWithText('Low','Prio-low');

    }
    if (priotity_low) {
        document.getElementById('urgentSection').innerHTML = loadPrioIMGWithText('Urgent','Prio-urgent');
        document.getElementById('mediumSection').innerHTML = loadPrioIMGWithText('Medium','Prio-medium');
        document.getElementById('lowSection').innerHTML = loadPrioIMGWithText('Low','Prio-low-white');

    }

    console.log('Hoch: ' + priotity_urgent + ' Mittel: ' + priotity_medium + ' Niedrig: ' + priotity_low);
}
function changeCategoryHeader(name) {
    document.getElementById('category-header').innerHTML = name;
    currentCategory = name;
}

function searchKanbanBoard(kanbanBoard, searchQuery) {
    const results = [];
    for (const card of kanbanBoard) {
        // Überprüfe, ob die Suchanfrage im Titel oder in der Beschreibung der Karte enthalten ist
        if (card.body_header.toLowerCase().includes(searchQuery) || card.body_content.toLowerCase().includes(searchQuery)) {
            // Füge die Karte zu den Suchergebnissen hinzu
            results.push(card);
        }
    }
    return results;
}

function findTasks() {
    let searchQuery = document.getElementById('findTask').value;
    searchQuery = searchQuery.toLowerCase()
    let searchedTasks = searchKanbanBoard(tasks, searchQuery);
    loadBoard(searchedTasks);
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function checkWhichMenu(id) {
    if (onMobile) {
        openContextMenu(id);
    }
    else {
        openTaskFull(id)
    }
}

function openContextMenu(id) {
    document.getElementById('contextMenu' + id).classList.remove('d-none')
}

async function changeSplit(split, id) {
    console.log('Split soll auf: "' + split + '" geändert werden');
    tasks[id]['split'] = split;
    await saveNotes();
    cleanOldBoard();
    loadNewBoard(tasks);
}