async function initSummary() {
    await includeHTML();
    await loadUsers();
    await loadAllTasks();
    showGreet();
    loadNotes();
}

async function loadAllTasks() {
    await downloadFromServer();
    tasksTest = JSON.parse(backend.getItem('allTasks')) || [];
    showAllCounts();
}

/*Show counts of board on summary*/
function showAllCounts() {
    showCountInBoard();
    showCountInProgress();
    showCountAwaitFeedback();
    showCountToDo();
    showCountDone();
    showCountUrgent();
    showDlDate();
}

function showCountInBoard() {
    let countInBoard = document.getElementById('countInBoard');
    countInBoard.innerHTML = tasksTest.length;
}

function showCountInProgress() {
    let countInProgress = document.getElementById('countInProgress');
    let count = 0;
    for (let i = 0; i < tasksTest.length; i++) {
        if (tasksTest[i].split === "in_progress") {
            count++;
        }
    }
    return countInProgress.innerHTML = count;
}

function showCountAwaitFeedback() {
    let countAwaitFeedback = document.getElementById('countAwaitFeedback');
    let count = 0;
    for (let i = 0; i < tasksTest.length; i++) {
        if (tasksTest[i].split === "awaiting_feedback") {
            count++;
        }
    }
    return countAwaitFeedback.innerHTML = count;
}

function showCountUrgent() {
    let countUrgent = document.getElementById('countUrgent');
    let count = 0;
    for (let i = 0; i < tasksTest.length; i++) {
        if (tasksTest[i].priotity[0].priotity === "urgent") {
            count++;
        }
    }
    return countUrgent.innerHTML = count;
}

function showCountToDo() {
    let countToDo = document.getElementById('countToDo');
    let count = 0;
    for (let i = 0; i < tasksTest.length; i++) {
        if (tasksTest[i].split === "to_do") {
            count++;
        }
    }
    return countToDo.innerHTML = count;
}

function showCountDone() {
    let countDone = document.getElementById('countDone');
    let count = 0;
    for (let i = 0; i < tasksTest.length; i++) {
        if (tasksTest[i].split === "done") {
            count++;
        }
    }
    return countDone.innerHTML = count;
}
/* End of: Show counts of board on summary*/

/*
function showDlDate() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('en-US', options);
    document.getElementById('dlDate').innerHTML = dateString;
}*/

function showDlDate() {
    let dlDate = tasksTest[0].date;
    for (let i = 1; i < tasksTest.length; i++) {
        if (new Date(tasksTest[i].date) < new Date(dlDate)) {
            dlDate = tasksTest[i].date;
        }
    }
    const date = new Date(dlDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return document.getElementById('dlDate').innerHTML = formattedDate;
}

function showGreet() {
    let greetElem = document.getElementById("greet");
    let currentTime = new Date();
    let currentHour = currentTime.getHours();

    if (currentHour < 12) {
        greetElem.innerHTML = "Good morning,";
    } else if (currentHour < 17) {
        greetElem.innerHTML = "Good afternoon,";
    } else {
        greetElem.innerHTML = "Good evening,";
    }
    showCurrentUser();
}

async function showCurrentUser() {
    document.getElementById('username').innerHTML = currentUser['name'];
}