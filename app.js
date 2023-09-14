// Declate variables
const form = document.querySelector('#newTodoForm');
const todo = document.querySelector('#todo');
const when = document.querySelector('#when');
const lists = document.querySelector('#lists')
const now = document.querySelector('#now')
const next = document.querySelector('#next')
const future = document.querySelector('#future')


// New Todo Listener
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let selectedOption = when.options[when.options.selectedIndex].text;
    if (selectedOption === 'Now') {
        targetList = now;
    } else if (selectedOption === 'Next') {
        targetList = next;
    } else {
        targetList = future
    }

    const newTodo = document.createElement('li')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    const removeBtn = document.createElement('button')
    removeBtn.innerText = 'X'
    newTodo.innerHTML = todo.value + '&nbsp&nbsp&nbsp'
    newTodo.prepend(checkbox)
    newTodo.appendChild(removeBtn)
    targetList.appendChild(newTodo)

});

// Existing Todo Listener
lists.addEventListener('click', function(e) {
    let text = ''
    let cb = ''
    if (e.target.tagName === 'LI') {
        text = e.target;
        cb = text.children[0];
    } else if (e.target.tagName === 'INPUT') {
        cb = e.target
        text = e.target.parentElement
    } else if (e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove()
        return
    } else {
        return
    }

    text.classList.toggle('completed')
    cb.checked = !cb.checked
    
})