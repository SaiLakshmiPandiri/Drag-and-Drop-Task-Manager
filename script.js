function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let task = document.createElement("div");
    task.classList.add("task");
    task.setAttribute("draggable", "true");
    task.setAttribute("ondragstart", "drag(event)");

    let taskId = "task-" + new Date().getTime();
    task.setAttribute("id", taskId);
    task.innerHTML = `${taskText} <button class="delete-btn" onclick="deleteTask('${taskId}')">X</button>`;

    document.getElementById("todo").appendChild(task);
    taskInput.value = "";
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let taskId = event.dataTransfer.getData("text");
    let taskElement = document.getElementById(taskId);

    if (event.target.classList.contains("board")) {
        event.target.appendChild(taskElement);
    }
}

function deleteTask(taskId) {
    let taskElement = document.getElementById(taskId);
    taskElement.parentNode.removeChild(taskElement);
}

function drop(event) {
    event.preventDefault();
    let taskId = event.dataTransfer.getData("text");
    let taskElement = document.getElementById(taskId);

    if (event.target.classList.contains("board")) {
        event.target.appendChild(taskElement);

        // Change task color based on the new board
        if (event.target.id === "todo") {
            taskElement.style.backgroundColor = "red"; // Yellow for To Do
        } else if (event.target.id === "inProgress") {
            taskElement.style.backgroundColor = "yellow"; // Blue for In Progress
        } else if (event.target.id === "done") {
            taskElement.style.backgroundColor = "green"; // Green for Done
        }
    }
}