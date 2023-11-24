// window.api.ipcRenderer.on("categoryCreated", (data) => {
//   console.log("cccccccccccc", data);
// });
document.addEventListener("DOMContentLoaded", () => {
  displayTasks();
  displayCategories();
});

async function addTasks() {
  const newTask = {};
  newTask.name = document.getElementById("taskName").value;
  newTask.description = document.getElementById("taskDescription").value;
  newTask.dueDate = document.getElementById("dueDate").value;
  newTask.category = document.getElementById("category").value;

  await window.api.addTask(newTask);

  document.getElementById("taskName").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("category").value = "";

  displayTasks();
}

async function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear previous list

  const tasks = await window.api.getTasks();

  tasks.forEach((task) => {
    const listItem = `<li class="list-group-item d-flex justify-content-between align-items-center ${
      task.isCompleted ? "bg-task-success" : ""
    }">
      <div class="form-check">
        <input class="form-check-input check-task" type="checkbox" id="check-task${
          task.id
        }"/>
        <label class="form-check-label" for="task${task.id}">
        ${task.name} - ${
      task.description
    } - Due: ${task.dueDate.toLocaleDateString()} - Category: ${
      task.category.name
    }</label>
      </div>
      <button id="delete-task${
        task.id
      }" type="button" class="btn btn-danger btn-sm delete-task">Delete</button>
    </li>`;

    // listItem.addEventListener("click", () => {
    //   window.api.markTaskAsCompleted(task.id);
    //   displayTasks();
    // });

    taskList.insertAdjacentHTML("beforeend", listItem);

    if (task.isCompleted) $(`#check-task${task.id}`)[0].checked = true;
  });

  $(".delete-task").on("click", async (e) => {
    await window.api.deleteTask(e.target.id.replace("delete-task", ""));
    displayTasks();
  });

  $(".check-task").on("click", async (e) => {
    await window.api.changeTaskState(
      e.target.id.replace("check-task", ""),
      e.target.checked
    );
    displayTasks();
  });
}

async function displayCategories() {
  const categorySelect = document.getElementById("category");
  categorySelect.innerHTML = "";
  const categories = await window.api.getCategories();
  // console.log(categories);
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

async function addNewCategory() {
  const newCategoryName = document.getElementById("newCategoryName").value;
  if (newCategoryName) {
    await window.api.addCategory(newCategoryName);
    $("#exampleModal").modal("hide");
    displayCategories();
  }
}
