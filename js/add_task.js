function init() {
    includeHTML();
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