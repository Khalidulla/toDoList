//находим элементы на странице
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  //предотвращает перезагрузку страницы
  event.preventDefault();
  //достаем текст задачи из поля ввода
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  //добавляем задачу в массив с задачами
  tasks.push(newTask);

  //формируем CSS класс
  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  //формируем разметку для новой задачи
  const taskHTML = `<li id = "${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                          <span class="${cssClass}">${newTask.text}</span>
                      <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                     <img src="./img/tick.svg" alt="Done" width="18" height="18">
                     </button>
                    <button type="button" data-action="delete" class="btn-action">
                   <img src="./img/cross.svg" alt="Done" width="18" height="18">
                   </button>
                </div>
                </li>`;
  //добавляем задачу на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  //очищаем поле ввода и возвращаем на него фокус
  taskInput.value = "";
  taskInput.focus();
  //если в списке задач более 1 элемента скрываем список дел пуст
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

function deleteTask(event) {
  //Проводим если клик был НЕ по кнопке "удалить задачу"
  if (event.target.dataset.action !== "delete") return;

  const parentNode = event.target.closest(".list-group-item");

  //Определение ID задачи
  const id = Number(parentNode.id);

  //Находим индекс задачи в массиве
  const index = tasks.findIndex((task) => task.id === id);

  //Удаляем задачу из массива
  tasks.splice(index, 1);

  //удаляем задачу из разметки
  parentNode.remove();
  //Проверка
  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}

function doneTask(event) {
  //проверка что клик был НЕ по кнопке "задача выполнена"
  if (event.target.dataset.action === "done") {
    //проверка что клик был по кнопке "задача выполнена"
    const parentNode = event.target.closest(".list-group-item");

    //Определяем ID задачи
    const id = Number(parentNode.id);

    const task = tasks.find(function(task){
      if (task.id === id){
        return true
      }
    })
    task.done = !task.done;

    const taskTitle = parentNode.querySelector(".task-title");
    taskTitle.classList.toggle("task-title--done");
  }
}
