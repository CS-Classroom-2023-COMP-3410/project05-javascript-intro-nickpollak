const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const filterButtons = document.querySelectorAll(".filter-button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
      taskItem.draggable = true;
      taskItem.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      taskItem.addEventListener("dragstart", () => handleDragStart(index));
      taskItem.addEventListener("dragover", handleDragOver);
      taskItem.addEventListener("drop", () => handleDrop(index));

      taskList.appendChild(taskItem);
    });
}

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  newTaskInput.value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

let draggedTaskIndex = null;

function handleDragStart(index) {
  draggedTaskIndex = index;
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(index) {
  const [draggedTask] = tasks.splice(draggedTaskIndex, 1);
  tasks.splice(index, 0, draggedTask);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-button.active").classList.remove("active");
    button.classList.add("active");
    renderTasks(button.id.replace("filter-", ""));
  });
});

addTaskButton.addEventListener("click", addTask);
newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();
