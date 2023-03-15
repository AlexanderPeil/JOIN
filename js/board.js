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

/**
 * Initializes the page by including the HTML, loading the notes,
 * and loading the board with the initial set of tasks.
 * @async
 * @function
 */
async function init() {
    includeHTML();
    await loadNotes();
    loadBoard(tasks);
}
/**
 * Loads the board with the specified set of tasks, cleaning out any
 * existing content and adding new content to the board.
 * @function
 * @param {array} choiceTasks - The set of tasks to load onto the board.
 */
function loadBoard(choiceTasks) {
    cleanOldBoard();
    loadNewBoard(choiceTasks);
    addDropArea();
}
/**
 * This function clean the old Kanban Board.
 * 
 */
function cleanOldBoard() {
    document.getElementById('to_do').innerHTML = '';
    document.getElementById('in_progress').innerHTML = '';
    document.getElementById('awaiting_feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}
/**
 * Loads a new task board with the specified tasks.
 *
 * @param {Array} toLoadTasks - An array of tasks to load on the board.
 */
function loadNewBoard(toLoadTasks) {
    for (let i = 0; i < toLoadTasks.length; i++) {
        const task = toLoadTasks[i];
        let catgoryLow = task['category'].toLowerCase();
        document.getElementById(task['split']).innerHTML += loadCardBoardText(task, i, catgoryLow);
        loadUsers(task, i);
        loadSubtasks(task, i);
    }
}
/**
 * Loads users into task card's user section.
 * @param {Object} task - The task object.
 * @param {number} i - The index of the task in the array of tasks.
 */
function loadUsers(task, i) {
    for (let j = 0; j < task['users'].length; j++) {
        const user = task['users'][j];
        document.getElementById('users' + i).innerHTML += loadUserShortsTmp(user)
    }
}
/**
 * Loads subtasks into task card's subtask section.
 * @param {Object} task - The task object.
 * @param {number} i - The index of the task in the array of tasks.
 */
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
/**
 * Adds a drop area to each split of the Kanban board.
 */
function addDropArea() {
    for (let i = 0; i < splits.length; i++) {
        const split = splits[i];
        document.getElementById(split).innerHTML += loadDropArea(split);
    }
}
/**
 * Sets the current dragged element.
 * @param {string} id - The id of the element being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}
/**
 * Allows elements to be dropped into the drop area.
 * @param {Object} ev - The event object.
 * @param {number} test - A test parameter.
 */
function allowDrop(ev, test) {
    ev.preventDefault();
    document.getElementById('dropArea_' + test).classList.add('borders');
}
/**
 * Disables drop of elements.
 * @param {string} ev - The event object.
 */
function diableDrop(ev) {
    document.getElementById('dropArea_' + ev).classList.remove('borders');
}
/**
 * Moves the dragged element to another category.
 * @param {string} category - The category to move the element to.
 */
async function moveTo(category) {
    tasks[currentDraggedElement]['split'] = category;
    loadBoard(tasks);
    await saveNotes();
}
/**
 * Ends dragging of an element.
 * @param {string} id - The id of the element being dragged.
 */
function endDragging(id) {
    document.getElementById('card' + id).style.transform = "rotate(0deg)";
}
/**
 * Loads the tasks from the server.
 */
async function loadNotes() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('allTasks')) || [];
}
/**
 * Saves the notes to the server.
 */
async function saveNotes() {
    let tasksAsJson = JSON.stringify(tasks);
    await backend.setItem('allTasks', tasksAsJson);
}
/**
 * Loads the users from the contacts file.
 */
async function loadContacts() {
    let response = await fetch('./js/contact.json');
    users_color = await response.json();
}
/**
 * Opens a full view of a task card.
 * @param {number} choiceTask - The index of the task in the array of tasks.
 */
function openTaskFull(choiceTask) {
    document.getElementById('popUp').innerHTML = loadCardFullText(tasks, choiceTask);
    loadSubtaksToFullTask(choiceTask);
    loadUsersToFullTask(choiceTask);
}
/**
 * Loads the subtasks to the full task view.
 * @param {number} choiceTask - The index of the task in the array of tasks.
 */
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
/**
 * Loads the users to the full task view.
 * @param {number} choiceTask - The index of the task in the array of tasks.
 */
function loadUsersToFullTask(choiceTask) {
    if (tasks[choiceTask]['users'].length > 0) {
        let users = tasks[choiceTask]['users']
        for (let u = 0; u < users.length; u++) {
            document.getElementById('userSection').innerHTML += loadTextUsersForFullTask(users, u);
        }
    }
}
/**
 * Closes the task pop-up window.
 * @param {number} currentCard - The index of the task in the array of tasks.
 */
async function closePopUp(currentCard) {
    checkSubtaskDone(currentCard)
    await saveNotes();
    document.getElementById('popUp').innerHTML = '';
    loadBoard(tasks);
}
/**
 * Checks if a subtask is done and updates the task accordingly.
 * @param {number} currentCard - The index of the task in the array of tasks.
 */
function checkSubtaskDone(currentCard) {
    for (let i = 0; i < tasks[currentCard]['subtasks'].length; i++) {
        let isDone = false;
        isDone = document.getElementById('subtask_' + i).checked;
        if (isDone) {
            tasks[currentCard]['subtasks'][i]['status'] = 'done';
        }
        else {
            tasks[currentCard]['subtasks'][i]['status'] = 'undone';
        }
    }
}
/**
 * Deletes a task from the array of tasks.
 * @param {number} choicCard - The index of the task in the array of tasks.
 */
async function delCard(choicCard) {
    tasks.splice(choicCard, 1);
    await saveNotes();
    document.getElementById('popUp').innerHTML = '';
    loadBoard(tasks);
}
/**
 * Opens the add task pop-up window.
 */
function openAddTask() {
    document.getElementById('popUp').innerHTML = loadAddTaskTmp();
    addAssignedToList();
}
/**
 * Toggles the visibility of a dropdown list.
 * @param {string} id - The id of the element to toggle.
 */
function openDropdown(id) {
    if (document.getElementById(id).classList.contains('d-none')) {
        document.getElementById(id).classList.remove('d-none');
    }
    else if (!document.getElementById(id).classList.contains('d-none')) {
        document.getElementById(id).classList.add('d-none');
    }
}
/**
 * 	Loads the user contacts from a JSON file and sets them to the "contacts" variable.
 * 	
 * @async
 * @function
*/ 
async function loadContacts() {
    let response = await fetch('./js/contact.json');
    contacts = await response.json();
}
/**
 * Adds the existing contacts to the "Assigned to" choices list.
 * First clears the current content of the list, then iterates over
 * the contacts array to generate a checkbox list of each contact's
 * first and last name, and assigns a value to each checkbox consisting
 * of the first initials of the first and last name concatenated.
 */
function addAssignedToList() {
    document.getElementById('assigned-to-choices').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstName = contact['firstName'];
        let lastName = contact['lastName'];
        let acronym = firstName[0] + lastName[0];
        document.getElementById('assigned-to-choices').innerHTML += `<div class="assigned-to-line"><label for="assigned-to-${i}" id="assigned_name${i}">${firstName + ' ' + lastName}</label><input type="checkbox" id="assigned-to-${i}" value="${acronym}"></div>`
    }
}
/**
 * Changes the subtask icons to the "clear" and "add" icons when the input field is changed.
 * @function
 * 
 */
function inputChangeSubIcons() {
    document.getElementById('plusSubtaskImg').classList.add('d-none');
    document.getElementById('clearSubtaskImg').classList.remove('d-none');
    document.getElementById('addSubtaskImg').classList.remove('d-none');
}
/**
 * Adds a subtask to the list and the subtasks array when the "Add" button is clicked.
 * @function
 * 
 */
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
/**
 * Clears the subtask input field and changes the subtask icons back to the "plus" icon.
 * @function
 * 
 */
function clearSubtask() {
    document.getElementById('subtask').value = "";
    document.getElementById('plusSubtaskImg').classList.remove('d-none');
    document.getElementById('clearSubtaskImg').classList.add('d-none');
    document.getElementById('addSubtaskImg').classList.add('d-none');

}
/**
 * Changes the subtask icons to the "clear" and "add" icons when the subtask input field is clicked.
 * @function
 * 
 */
function changeSubIcon() {
    document.getElementById('plusSubtaskImg').classList.add('d-none');
    document.getElementById('clearSubtaskImg').classList.remove('d-none');
    document.getElementById('addSubtaskImg').classList.remove('d-none');
}
/**
 * Adds a new task to the tasks array and saves it to storage when the "Add" button is clicked.
 * @function
 * @returns {Promise<void>}
 */
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
/**
 * Checks the priority level selected and returns the corresponding image and string.
 * @function
 * @returns {object[]} - An array with an object containing the priority image, string, and white image.
 */
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
/**
 * Closes the pop-up for adding a task.
 * @function
 * 
 */
function closePopUpAddTask() {
    document.getElementById('popUp').innerHTML = '';
}
/**
 * Clears all fields and checkboxes in the task form.
 */
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
/**
 * Changes the color of the priority sections based on the selected priority radio button.
 */
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
}
/**
 * Changes the text in the category header.
 * @param {string} name - The new category name.
 */
function changeCategoryHeader(name) {
    document.getElementById('category-header').innerHTML = name;
    currentCategory = name;
}
/**
 * Searches the kanban board for tasks that match the given search query.
 * @param {Array} kanbanBoard - The array of tasks to search.
 * @param {string} searchQuery - The search query string.
 * @returns {Array} - An array of tasks that match the search query.
 */
function searchKanbanBoard(kanbanBoard, searchQuery) {
    const results = [];
    for (const card of kanbanBoard) {
        if (card.body_header.toLowerCase().includes(searchQuery) || card.body_content.toLowerCase().includes(searchQuery)) {
            results.push(card);
        }
    }
    return results;
}
/**
 * Finds tasks that match the search query and loads them onto the kanban board.
 */
function findTasks() {
    let searchQuery = document.getElementById('findTask').value;
    searchQuery = searchQuery.toLowerCase()
    let searchedTasks = searchKanbanBoard(tasks, searchQuery);
    loadBoard(searchedTasks);
}
/**
 * Checks if the device is a mobile device.
 * @returns {boolean} - true if the device is a mobile device, false otherwise.
 */
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}
/**
 * Determines which menu to open based on the device type.
 * @param {string} id - The task ID.
 */
function checkWhichMenu(id) {
    if (onMobile) {
        openContextMenu(id);
    }
    else {
        openTaskFull(id)
    }
}
/**
 * Opens the context menu for the given task ID.
 * @param {string} id - The task ID.
 */
function openContextMenu(id) {
    document.getElementById('contextMenu' + id).classList.remove('d-none')
}
/**
 * Changes the split value of the given task.
 * @param {string} split - The new split value.
 * @param {string} id - The task ID.
 */
async function changeSplit(split, id) {
    tasks[id]['split'] = split;
    await saveNotes();
    cleanOldBoard();
    loadNewBoard(tasks);
}