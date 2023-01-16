
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ulContainer = document.querySelector('ul');
const form = document.querySelector("form");
const input = document.querySelector("form > input");

const todos = [
    {text: "Aller faire les courses", done: false, editMode: true},
    {text: "Aller chercher les resultats cliniques", done: true, editMode: false},
]

form.addEventListener('submit', (event) => {
    event.preventDefault(); // on arrete le rechargement de la page
    const todoText = input.value; // je recupere le text dans le zone de saisie du input
    input.value = '';

    const newTodo = { text: todoText, done: false, editMode: false };
    todos.push(newTodo); // on ajoute cette nouvelle tache dans la liste des taches todos
    displayTodos();
})


// fonction flechee qui va creer et remplir une balise <li>
const createTodoElement = (todo, index) => {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    li.classList.add("d-flex", "align-items-start");
    deleteBtn.classList.add("btn", "btn-danger", "mx-2");
    editBtn.classList.add("btn", "btn-primary", "mx-2");

    deleteBtn.innerText = "Supprimer";
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // on arrete la propagation de l'event
        todos.splice(index, 1);
        displayTodos();
    })

    editBtn.innerText = "Editer";
    editBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        todos[index].editMode = !todos[index].editMode;
        displayTodos();
    })

    li.innerHTML = `
        <span class="todo ${todo.done ? 'done' : ''}"></span>
        <p class="w-100">${todo.text}</p>
    `


    li.addEventListener('click', (event) => {
        todos[index].done = !todos[index].done;
        displayTodos();
    })

    li.append(editBtn, deleteBtn);

    return li;
}

const createTodoEditElement = (todo, index) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    const saveBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    li.classList.add("d-flex", "align-items-start");
    input.classList.add("w-100")
    saveBtn.classList.add("btn", "btn-primary", "mx-2");
    cancelBtn.classList.add("btn", "btn-danger", "mx-2");

    input.type = "text";
    input.value = todo.text;

    saveBtn.innerText = "Sauvegarder";
    cancelBtn.innerText = "Annuler";

    cancelBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        todos[index].editMode = !todos[index].editMode;
        displayTodos();
    })

    saveBtn.addEventListener('click', (event)=> {
        event.stopPropagation();
        const value = input.value;
        todos[index].text = value;
        todos[index].editMode = false;
        displayTodos();
    })

    li.append(input, cancelBtn, saveBtn);
    return li;
}

// fonction flechee qui va afficher la liste des taches, map => array, filter => array, reduce => valeur

const displayTodos = () => {
    const todosNode = todos.map((todo, index) => {
        if(todo.editMode) {
            return createTodoEditElement(todo, index);
        } else {
            return createTodoElement(todo, index)
        }
    });

    ulContainer.innerHTML = '';
    ulContainer.append(...todosNode)
}

displayTodos();