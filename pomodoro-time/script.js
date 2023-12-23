let timer;

const STATIC_MIN = 25;
const STATIC_SEC = 0;

let minutes = STATIC_MIN;
let seconds = STATIC_SEC;
let tasks = [];
let selectedTaskIndex = -1;

const taskList =
  document.getElementById("task-list");

document
  .getElementById("add-task-btn")
  .addEventListener("click", addTask);

document
  .getElementById("start-btn")
  .addEventListener("click", startTimer);

document
  .getElementById("stop-btn")
  .addEventListener("click", stopTimer);

function addTask() {
  const taskInput =
    document.getElementById("new-task");

  const taskName = taskInput.value.trim();

  if (!taskName) return;

  tasks.push(taskName);
  taskInput.value = "";
  updateTaskList();
}

function updateTaskList() {
  taskList.innerHTML = "";

  tasks.map((value, index) => {
    createTaskHtml(value, index);
  });
}

function createTaskHtml(task, index) {
  const taskItem = document.createElement("div");
  const p = document.createElement("p");

  p.innerText = task;

  taskItem.appendChild(p);
  taskItem.classList.add("task-item");

  if (selectedTaskIndex === index) {
    taskItem.classList.add("selected-task");
  }

  taskItem.addEventListener("click", () => {
    selectTask(index);
  });

  const button = document.createElement("button");

  button.textContent = "🗑️";

  button.classList.add("delete-btn");

  button.onclick = () => deleteTask(index);

  taskItem.appendChild(button);

  taskList.appendChild(taskItem);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();

  if (tasks.length == 0) {
    // stop timer!
  }
}

function selectTask(index) {
  if (selectedTaskIndex !== index) {
    selectedTaskIndex = index;
    updateTaskList();
  }
}

// start timer

function updateSelectedTaskName(value) {
  document.getElementById(
    "selected-task-name"
  ).textContent = value;
}

function startTimer() {
  if (selectedTaskIndex < 0) {
    return updateSelectedTaskName(
      "No task selected"
    );
  }

  timer = setInterval(() => {
    if (minutes === 0 && seconds === 0) {
      // done
      clearInterval(timer);
      const message =
        "Pomodoro session compleated! take a break.";
      alert(message);

      minutes = STATIC_MIN;
      seconds = STATIC_SEC;
      // update timer
    } else if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimer();
  }, 1000);
}
function updateTimer() {
  const timerElement =
    document.getElementById("timer");

  timerElement.textContent = `
    ${minutes
      .toString()
      .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}
    `;

  const selectedTaskName = tasks[
    selectedTaskIndex
  ]
    ? `selected: ${tasks[selectedTaskIndex]}`
    : "No task selected";

  updateSelectedTaskName(selectedTaskName);
}

function stopTimer() {
  clearInterval(timer);
  minutes = STATIC_MIN;
  seconds = STATIC_SEC;
  updateTimer();
}
