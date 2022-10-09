const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  //JSON.stringify(): js object나 array 등 어떤 것이든 string으로.
  //JSON.parse(): array를 string으로.
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  //⬇️ input의 현재 value를 새로운 변수에 복사.
  //⬇️ 이 때 newTodo는 input의 value를 비우기 전(toDoInput.value = "";)의 값을 나타내는 string이다.
  const newTodo = toDoInput.value;
  //⬇️ 그 이후에 toDoInput.value로 무엇을 하든 newToDo 변수와는 상관 없다.
  toDoInput.value = "";
  //⬇️ 저장한 텍스트(newTodo)를 toDos array에 push
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos(); // 이 때 newTodo는 array에 들어있다.
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  //JSON.stringify() 로 string 만든 것에 대해
  //string이 아닌 js에서 사용가능한 object로 만들기 ⬇️
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos; //localStorage에 toDo들 있으면 parsedToDos 넣어서 전에 있던 toDo들 복원하기
  //parsedToDos.forEach(sayHello); "각각의 item에 대해" sayHello를 실행
  parsedToDos.forEach(paintToDo); // paintToDo를 parsedToDos 배열의 요소마다 실행한다.
  //⬆️ item을 paint하기(나타내고 싶은 것)
}
