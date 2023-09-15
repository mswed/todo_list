// Declate variables
const form = document.querySelector('#newTodoForm');
const todo = document.querySelector('#todo');
const when = document.querySelector('#when');
const lists = document.querySelector('#lists')
const now = document.querySelector('#now')
const next = document.querySelector('#next')
const future = document.querySelector('#future')
loadTodos()
toggleLists()

// New Todo Listener
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!todo.value) {
        alert('Ahhh... Enter some in the todo field?')
        return
    }
    let selectedOption = when.options[when.options.selectedIndex].text;
    if (selectedOption === 'Now') {
        targetList = now;
    } else if (selectedOption === 'Next') {
        targetList = next;
    } else {
        targetList = future
    }

    const newTodo = document.createElement('li')
    const todoId = Math.random() * Math.random()
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    const removeBtn = document.createElement('button')
    removeBtn.innerText = 'X'
    newTodo.innerHTML = todo.value + '&nbsp&nbsp&nbsp'
    newTodo.dataset.id = todoId
    newTodo.prepend(checkbox)
    newTodo.appendChild(removeBtn)

    targetList.appendChild(newTodo)
    toggleLists()
    saveTodos()

});

// Existing Todo Listener
lists.addEventListener('click', function (e) {
    let text = ''
    let cb = ''
    if (e.target.tagName === 'LI') {
        // We clicked a list. Find the checkbox.
        text = e.target;
        cb = text.children[0];
    } else if (e.target.tagName === 'INPUT') {
        // We clicked a checkbox. Find the list item.
        cb = e.target
        text = e.target.parentElement
    } else if (e.target.tagName === 'BUTTON') {
        // We clicked a button. Remove the list item. 
        e.target.parentElement.remove()
        saveTodos()
        toggleLists()
        return
    } else {
        // Ignore any other type of element
        return
    }

    text.classList.toggle('completed')
    text.classList.contains('completed') ? cb.checked = true : cb.checked = false;
    toggleLists()

})

function toggleLists() {
    for (let list of [now, next, future]) {
        if (list.children.length > 0) {
            list.parentElement.style.display = 'block'
        } else {
            list.parentElement.style.display = 'none'
        }
    }
}

function saveTodos() {
    for (let list of [now, next, future]) {
        let todos = []
        window.localStorage.setItem(list.id, [])
        for (let todo of list.children) {
            todos.push(todo.innerHTML)
            console.log(todos)
            window.localStorage.setItem(list.id, todos)
        }
    }
}

function loadTodos() {
    for (let list of ['now', 'next', 'future']) {
        todos = localStorage.getItem(list)
        if (todos) {
            todos = todos.split(',')

            console.log(todos)
            if (list === 'now') {
                targetList = now
            } else if (list === 'next') {
                targetList = next
            } else {
                targetList = future
            }


            for (let todo of todos) {
                console.log('>>>>>', todo)
                // console.log(JSON.parse(todos))
                newTodo = document.createElement('li')
                newTodo.innerHTML = todo
                console.log('>>>>', newTodo)
                targetList.appendChild(newTodo)
                toggleLists()

            }
        }
    }
}