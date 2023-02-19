function init() {
    includeHTML();
}


/*********Change button color of prio**********/

/*Change urgent button to red*/
function showUrgentRedBtn() {
    let urgentBtnWhite = document.getElementById('urgentBtnWhite');
    let urgentBtnRed = document.getElementById('urgentBtnRed');

    if (urgentBtnWhite.style.backgroundColor == 'white') {
        urgentBtnWhite.classList.add('d-none');
        urgentBtnRed.classList.remove('d-none');
    } else {
        urgentBtnRed.classList.remove('d-none');
        urgentBtnWhite.classList.add('d-none');
    }
}

/*Change urgent button to white*/
function showUrgentWhiteBtn() {
    let urgentBtnWhite = document.getElementById('urgentBtnWhite');
    let urgentBtnRed = document.getElementById('urgentBtnRed');

    if (urgentBtnWhite.style.backgroundColor == 'white') {
        urgentBtnWhite.classList.remove('d-none');
        urgentBtnRed.classList.add('d-none');
    } else {
        urgentBtnRed.classList.add('d-none');
        urgentBtnWhite.classList.remove('d-none');
    }
}

/*Change medium button to orange*/
function showMediumOrangeBtn() {
    let mediumBtnWhite = document.getElementById('mediumBtnWhite');
    let mediumBtnOrange = document.getElementById('mediumBtnOrange');

    if (mediumBtnWhite.style.backgroundColor == 'white') {
        mediumBtnWhite.classList.add('d-none');
        mediumBtnOrange.classList.remove('d-none');
    } else {
        mediumBtnOrange.classList.remove('d-none');
        mediumBtnWhite.classList.add('d-none');
    }
}

/*Change medium button to white*/
function showMediumWhiteBtn() {
    let mediumBtnWhite = document.getElementById('mediumBtnWhite');
    let mediumBtnOrange = document.getElementById('mediumBtnOrange');

    if (mediumBtnWhite.style.backgroundColor == 'white') {
        mediumBtnWhite.classList.remove('d-none');
        mediumBtnOrange.classList.add('d-none');
    } else {
        mediumBtnOrange.classList.add('d-none');
        mediumBtnWhite.classList.remove('d-none');
    }
}

/*Change low button to green*/
function showLowGreenBtn() {
    let lowBtnWhite = document.getElementById('lowBtnWhite');
    let lowBtnGreen = document.getElementById('lowBtnGreen');

    if (lowBtnWhite.style.backgroundColor == 'white') {
        lowBtnWhite.classList.add('d-none');
        lowBtnGreen.classList.remove('d-none');
    } else {
        lowBtnGreen.classList.remove('d-none');
        lowBtnWhite.classList.add('d-none');
    }
}

/*Change low button to green*/
function showLowWhiteBtn() {
    let lowBtnWhite = document.getElementById('lowBtnWhite');
    let lowBtnGreen = document.getElementById('lowBtnGreen');

    if (lowBtnWhite.style.backgroundColor == 'white') {
        lowBtnWhite.classList.remove('d-none');
        lowBtnGreen.classList.add('d-none');
    } else {
        lowBtnGreen.classList.add('d-none');
        lowBtnWhite.classList.remove('d-none');
    }
}