const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const clearBtn = document.querySelector('#clear-all');
const taskCount = document.querySelector('#task-count');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCount() {
  taskCount.textContent = `${todos.length} task${todos.length !== 1 ? 's' : ''}`;
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${todo.text}</span>
      <button onclick="deleteTodo(${index})">❌</button>
    `;
    list.appendChild(li);
  });
  updateCount();
  saveTodos();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    input.value = '';
    renderTodos();
  }
});

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

clearBtn.addEventListener('click', () => {
  if (confirm('Clear all tasks?')) {
    todos = [];
    renderTodos();
  }
});

renderTodos();
