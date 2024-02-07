//находим элементы на странице
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

//Добавление задач
form.addEventListener("submit", addTask);

//Удаление задачи
tasksList.addEventListener("click", deleteTask);
//Выполнение задачи
tasksList.addEventListener('click', doneTask)

function addTask(event) {
  //предотвращает перезагрузку страницы
  event.preventDefault();
  //достаем текст задачи из поля ввода
  const taskText = taskInput.value;
  //формируем разметку для новой задачи
  const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
                          <span class="task-title">${taskText}</span>
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
  //Проводим что клик был по кнопке "удалить задачу"
  if (event.target.dataset.action === "delete") {
    console.log("DELETE!");
    const parentNode = event.target.closest('.list-group-item');
    parentNode.remove()
  }
  //Проверка
  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
}
}

function doneTask(event) {
   //проверка что клик был по кнопке "задача выполнена"
   if (event.target.dataset.action === 'done'){
      const parentNode = event.target.closest('.list-group-item');
      const taskTitle = parentNode.querySelector('.task-title')
      taskTitle.classList.toggle('task-title--done');
   }
}