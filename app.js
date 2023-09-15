
// Declare variables
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
        alert('Ahhh... Enter something in the todo field?')
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
    saveTodos()

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
        for (let todo of list.children) {
            let todoInfo = {
                html: todo.innerHTML,
                status: todo.className ? todo.className : "none"
            }
            todos.push(todoInfo)
            localStorage.setItem(list.id, JSON.stringify(todos))
            let why = JSON.parse(localStorage.getItem(list.id))
            console.log(why)
        }
    }
}

function loadTodos() {
    for (let list of ['now', 'next', 'future']) {
        if (localStorage.getItem(list)) {
            let todos = JSON.parse(localStorage.getItem(list))
            for (let todo of todos) {
                console.log(todo)
                let { html, status } = todo
                console.log(html)
                if (list === 'now') {
                    targetList = now
                } else if (list === 'next') {
                    targetList = next
                } else {
                    targetList = future
                }
                newTodo = document.createElement('li')
                newTodo.innerHTML = html
                targetList.appendChild(newTodo)
                if (status === 'completed') {
                    newTodo.classList.add('completed')
                    const cb = newTodo.children[0]
                    cb.checked = true
                }
                
                toggleLists()
            }

        }



        //     for (let todo of todos) {
        //         console.log('input >>>>>', todo)
        // // console.log(JSON.parse(todos))
        // newTodo = document.createElement('li')
        // newTodo.innerHTML = todo
        // console.log('>>>>', newTodo)
        // targetList.appendChild(newTodo)
        // toggleLists()

    }
    //         }
    //     }
}