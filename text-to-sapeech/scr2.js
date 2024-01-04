let timer;
const STATIC_MIN = 25;
const STATIC_SEC = 0;

let minutes = 25;
let seconds = 0;
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
  const newTaskInput =
    document.getElementById("new-task");

  if (newTaskInput.value.trim() !== "") {
    tasks.push(newTaskInput.value.trim());
    updateTaskList();
    newTaskInput.value = "";
  }
}

function createTaskHtml(task, index) {
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";
  taskItem.textContent = task.trim();

  taskItem.addEventListener("click", () =>
    selectTask(index)
  );

  const deleteButton =
    document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteTask(index);
  taskItem.appendChild(deleteButton);

  if (index === selectedTaskIndex) {
    taskItem.classList.add("selected-task");
  }

  taskList.appendChild(taskItem);
}

function deleteTask(index) {
  if (index === selectedTaskIndex) {
    selectedTaskIndex = -1;
    updateTimer();
  }
  tasks.splice(index, 1);
  updateTaskList();
  if (tasks.length == 0) stopTimer();
}

function selectTask(index) {
  if (selectedTaskIndex !== index) {
    selectedTaskIndex = index;
    updateTaskList();
    updateTimer();
  }
}

function updateTaskList() {
  taskList.innerHTML = "";
  console.log(tasks);
  tasks.forEach((task, index) => {
    createTaskHtml(task, index);
  });
}

function updateAlert(text) {
  document.getElementById(
    "selected-task-name"
  ).textContent = text;
}

function updateTimer() {
  const timerElement =
    document.getElementById("timer");
  timerElement.textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const selectedTaskName = tasks[
    selectedTaskIndex
  ]
    ? `Selected Task: ${tasks[selectedTaskIndex]}`
    : "No task selected";

  if (!selectedTaskName) return;

  document.getElementById(
    "selected-task-name"
  ).textContent = selectedTaskName;
}

function startTimer() {
  if (selectedTaskIndex < 0)
    return updateAlert("No task selected");
  timer = setInterval(() => {
    if (minutes === 0 && seconds === 0) {
      clearInterval(timer);
      playTimerSound();
      alert(
        "Pomodoro session completed! Take a break."
      );
      minutes = STATIC_MIN;
      seconds = STATIC_SEC;
      updateTimer();
    } else if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  minutes = STATIC_MIN;
  seconds = STATIC_SEC;
  updateTimer();
}

function playTimerSound() {
  // Replace 'path/to/soundfile.mp3' with the actual path to your sound file
  let audio = new Audio("path/to/soundfile.mp3");
  audio.play();
}
