let tasks = [];
/**
 * Initializes the application by calling the includeHTML function, loading notes, and adding assigned tasks to the list.
 * @returns {Promise<void>}
 */
async function init() {
    includeHTML();
    loadNotes();
    addAssignedToList();
}
/**
 * Saves the current tasks object as a JSON string to local storage using the backend object.
 * @returns {Promise<void>}
 */
async function saveNotes() {
    let tasksAsJson = JSON.stringify(tasks);
    await backend.setItem('allTasks', tasksAsJson);
}
/**
 * Downloads data from the server, parses the saved tasks JSON string from local storage, and assigns the resulting array to the global variable tasks.
 * @returns {Promise<void>}
 */
async function loadNotes() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('allTasks')) || [];
}
