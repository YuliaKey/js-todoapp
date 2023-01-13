
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ulContainer = document.querySelector('ul');
const form = document.querySelector("form");
const input = document.querySelector("form > input");

const todos = [
    {text: "Aller faire les courses", done: false},
    {text: "Aller chercher les resultats cliniques", done: true},
]

form.addEventListener('submit', (event) => {
    event.preventDefault(); // on arrete le rechargement de la page
    const todoText = input.value; // je recupere le text dans le zone de saisie du input
    input.value = '';

    const newTodo = { text: todoText, done: false }
    todos.push(newTodo); // on ajoute cette nouvelle tache dans la liste des taches todos
    displayTodos();
})


// fonction flechee qui va creer et remplir une balise <li>
const createTodoElement = (todo, index) => {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');

    li.classList.add("d-flex", "align-items-start");
    deleteBtn.classList.add("btn", "btn-danger", "mx-2");

    deleteBtn.innerText = "Supprimer";
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // on arrete la propagation de l'event
        todos.splice(index, 1);
        displayTodos();
    })

    li.innerHTML = `
        <span class="todo ${todo.done ? 'done' : ''}></span>
        <p class="w-100">${todo.text}</p>
        <button class="btn btn-primary mx-2">Editer</button>
    `

    li.addEventListener('click', (event) => {
        todos[index].done = !todos[index].done;
        displayTodos();
    })

    li.appendChild(deleteBtn);

    return li;
}

// fonction flechee qui va afficher la liste des taches, map => array, filter => array, reduce => valeur

const displayTodos = () => {
    const todosNode = todos.map((todo, index) => {
        return createTodoElement(todo, index)
    });

    ulContainer.innerHTML = '';
    ulContainer.append(...todosNode)
}

displayTodos();