async function initSummary() {
    await includeHTML();
    await loadUsers();
    await loadAllTasks();
    showGreetMobile();
    showGreetDesktop();
    loadNotes();

}

async function loadAllTasks() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
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

function deletOverDiv() {
    setTimeout(function() {
        document.getElementById('overDivMobile').classList.add('d-none');
    }, 300)
}

function showGreetMobile() {
    let greetElem = document.getElementById("greetMobile");
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
    mobileGreet();
}

function mobileGreet() {
    if (window.innerWidth < 1000) {
        let greetMobileCont = document.getElementById("greetMobileCont");
        let mainContainer = document.getElementById('mainContainer');
        if (document.referrer.includes("index.html")) {
            greetMobileCont.classList.remove('d-none');
            mainContainer.classList.add('d-none');
            setTimeout(function() {
                greetMobileCont.classList.add('d-none');
                mainContainer.classList.remove('d-none');
            }, 2500);
        }
    }
}

function showCountInBoard() {
    let countInBoard = document.getElementById('countInBoard');
    countInBoard.innerHTML = allTasks.length;
}

function showCountInProgress() {
    let countInProgress = document.getElementById('countInProgress');
    let count = 0;
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].split === "in_progress") {
            count++;
        }
    }
    return countInProgress.innerHTML = count;
}

function showCountAwaitFeedback() {
    let countAwaitFeedback = document.getElementById('countAwaitFeedback');
    let count = 0;
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].split === "awaiting_feedback") {
            count++;
        }
    }
    return countAwaitFeedback.innerHTML = count;
}

function showCountUrgent() {
    let countUrgent = document.getElementById('countUrgent');
    let count = 0;
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].priotity[0].priotity === "urgent") {
            count++;
        }
    }
    return countUrgent.innerHTML = count;
}

function showCountToDo() {
    let countToDo = document.getElementById('countToDo');
    let count = 0;
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].split === "to_do") {
            count++;
        }
    }
    return countToDo.innerHTML = count;
}

function showCountDone() {
    let countDone = document.getElementById('countDone');
    let count = 0;
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].split === "done") {
            count++;
        }
    }
    return countDone.innerHTML = count;
}
/* End of: Show counts of board on summary*/

function showDlDate() {
    let dlDate = allTasks[0].date; /*Die Variable dlDate wird initialisiert und mit dem Datumswert des ersten Elements im tasksTest-Array initialisiert:*/
    for (let i = 1; i < allTasks.length; i++) {
        if (new Date(allTasks[i].date) < new Date(dlDate)) { /*Innerhalb der Schleife wird geprüft, ob das Datum des aktuellen Elements kleiner ist als das gespeicherte Datum "dlDate".*/
            dlDate = allTasks[i].date; /*Wenn das Datum des aktuellen Elements kleiner ist als das gespeicherte Datum, wird das Datum des aktuellen Elements als neues "dlDate" gespeichert*/
        }
    }
    const date = new Date(dlDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return document.getElementById('dlDate').innerHTML = formattedDate;
}

async function showGreetDesktop() {
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
    document.getElementById('usernameMobile').innerHTML = currentUser['name'];
}