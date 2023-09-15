// Declare variables
const form = document.querySelector('#newTodoForm');
const todo = document.querySelector('#todo');
const when = document.querySelector('#when');
const lists = document.querySelector('#lists')
const now = document.querySelector('#now')
const next = document.querySelector('#next')
const future = document.querySelector('#future')

// Rus setup
loadTodos()
toggleLists()

// New Todo Listener
form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Warn user if todo is empty
    if (!todo.value) {
        alert('Ahhh... Enter something in the todo field?')
        return
    }
    // Pick todo type (now, next, future)
    let selectedOption = when.options[when.options.selectedIndex].text;
    if (selectedOption === 'Now') {
        targetList = now;
    } else if (selectedOption === 'Next') {
        targetList = next;
    } else {
        targetList = future
    }

    // Create todo
    const newTodo = document.createElement('li')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    const removeBtn = document.createElement('button')
    removeBtn.innerText = 'X'
    newTodo.innerHTML = todo.value + '&nbsp&nbsp&nbsp'
    newTodo.prepend(checkbox)
    newTodo.appendChild(removeBtn)
    targetList.appendChild(newTodo)

    // Update UI and storage
    todo.value = ''
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

    // Toggle todo
    text.classList.toggle('completed')
    text.classList.contains('completed') ? cb.checked = true : cb.checked = false;
    
    // Update UI and storage
    toggleLists()
    saveTodos()

})

function toggleLists() {
    // Toggle the visibility of lists. Empty lists aren't displayed.
    for (let list of [now, next, future]) {
        if (list.children.length > 0) {
            list.parentElement.style.display = 'block'
        } else {
            list.parentElement.style.display = 'none'
        }
    }
}

function saveTodos() {
    // Store the todos in localStorage
    for (let list of [now, next, future]) {
        // Clear the list
        localStorage.setItem(list.id, '')
        
        // Make a new list
        let todos = []
        for (let todo of list.children) {
            let todoInfo = {
                html: todo.innerHTML,
                status: todo.className ? todo.className : "none"
            }
            todos.push(todoInfo)
        localStorage.setItem(list.id, JSON.stringify(todos))
        }
    }
}

function loadTodos() {
    // Load the todos from localStorage
    for (let list of ['now', 'next', 'future']) {
        if (localStorage.getItem(list)) {
            // We only run if we get a list item
            let todos = JSON.parse(localStorage.getItem(list))
            
            for (let todo of todos) {
                //Pickup which list we're adding to
                let { html, status } = todo
                if (list === 'now') {
                    targetList = now
                } else if (list === 'next') {
                    targetList = next
                } else {
                    targetList = future
                }
                // Add the todo
                newTodo = document.createElement('li')
                newTodo.innerHTML = html
                targetList.appendChild(newTodo)
                if (status === 'completed') {
                    newTodo.classList.add('completed')
                    const cb = newTodo.children[0]
                    cb.checked = true
                }
                
                // Update the UI
                toggleLists()
            }

        }

    }

}