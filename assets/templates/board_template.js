function loadCardFullText(task_name, choiceTask){
    return `
    <div class="popUp-background">
            <div class="popUp-content">
                <div class="popUp-close" onclick="closePopUp(${choiceTask})">x</div>
                <div class="card-head" style="background-color: var(--${task_name[choiceTask]['category'].toLowerCase()});">${task_name[choiceTask]['category']}</div>
                <h2>${task_name[choiceTask]['body_header']}</h2>
                <p>${task_name[choiceTask]['body_content']}</p>
                
                <div id=subtaskSectionCheck>
                <label><b>Subtasks</b></label>
                <section class="subtaskSection" id="subtaskSection">
                </section></div>
                <div class="makeRow"><b class="margin10">Due Date: </b><p>${task_name[choiceTask]['date']}</p></div>
                <div class="makeRow"><b class="margin10">Priority: </b><p class="prio-${task_name[choiceTask]['priotity'][0]['priotity']}-popUp">${task_name[choiceTask]['priotity'][0]['priotity']} <img src="${tasks[choiceTask]['priotity'][0]['img_white']}"></p></div>
                <div class="makeRow"><b class="margin10">Assigned To: </b></div>
                <div class="users makeColumn" id="userSection"></div>
                <div class="put_it_right"><img src="./assets/img/empty-trash-32.png" onclick=delCard(${choiceTask})></div>
            </div>
        </div>    
    `
}

function loadCardBoardText(tasks_name, id, catgoryLow){
    return `
    <div class="card" id=card${id} draggable="true" ondragstart="startDragging(${id})" ondragend="endDragging(${id})" onclick="checkWhichMenu(${id})">
        
            <div class="card-content">                                      
                <div class="card-head" style="background-color: var(--${catgoryLow});">
                    ${(tasks_name['category'])}
                </div>
                <div class="card-body">
                    <h4>${tasks_name['body_header']}</h4>
                    <p>${tasks_name['body_content']}</p>
                </div>
                <div id="progress${id}">
                </div>
                <div class="priotity_users">
                    <div class="users" id="users${id}">
                    </div>
                    <div class="priotity">
                        <img src="${tasks_name['priotity'][0]['img']}" alt="">
                    </div>
                </div>
            </div>
    
            <div>
                <div class="popUpWish d-none" id="contextMenu${id}">
                    <h3>Choice your Wish</h3>
                    <div onclick="changeSplit('to_do',${id})">
                        <p>Change to <b>To Do</b></p>
                    </div>
                    <div onclick="changeSplit('in_progress',${id})">
                        <p>Change to <b>In Progress</b></p>
                    </div>
                    <div onclick="changeSplit('awaiting_feedback',${id})">
                        <p>Change to <b>Awaiting Feedback</b></p>
                    </div>
                    <div onclick="changeSplit('done',${id})">
                        <p>Change to <b>Done</b></p>
                    </div>
                    <div onclick="openTaskFull(${id})">
                        <p>Open <b>Full Task</b></p>
                    </div>
                </div>
            </div>
    </div>

    
    `
}

function loadAddTaskTmp(){
    return `<div class="popUp-background">
    <div class="popUp-content_add_task" id="popup-add-task">
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
                Low<img id="prioUrgentWhite" src="assets/img/Prio-low-white.png">
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
}

function loadSubtaskBoardtmp(doneTasks, sumTasks){
    return `
    <div class="progress_bar">
        <div style="width: 70%; background-color: lightgrey; border-radius: 3px;">
            <div style="background: #0D99FF; height:12px;width:${doneTasks / sumTasks * 100}%; border-radius: 3px;">
            </div>
        </div>
        <div>
            ${doneTasks}/${sumTasks} Done
        </div>
    </div>`
}


function loadUserShortsTmp(user){
    return `<p class="circle" style="background-color: blue;">${user['userShort']}</p>`
}

function loadTextUsersForFullTask(users, u){
    return `<div class="makeRow">
    <p class="circle" style="background-color: blue; margin-right: 20px;">${users[u]['userShort']}</p><p>${users[u]['userFullName']}</p>
    </div>`
}

function loadDropArea(split){
    return `<div class="dropArea" id="dropArea_${split}" ondrop="moveTo('${split}')" ondragover="allowDrop(event, '${split}')" ondragleave="diableDrop('${split}')"></div>`
}

function loadPrioIMGWithText(pri,prioIMG){
    return `${pri}<img src="assets/img/${prioIMG}.png">`;
}