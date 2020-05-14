// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    if(todosJSON){
        return JSON.parse(todosJSON)
    }
    return []
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on flters
const renderTodos = ()=>{
    const todoEl = document.querySelector('#todos')
    let filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter((todo)=>{
        return !filters.hideCompleted || !todo.completed
    })

    // debugger keyword allows for debug breakpoint
    // debugger

    const incompleteTodos = filteredTodos.filter( todo => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos));
    
    if(filteredTodos.length){
        filteredTodos.forEach(function (todo) {
            document.querySelector('#todos').appendChild(generateTodoDOM(todo))  
        })
    }else{
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no to-dos to show'
        todoEl.appendChild(messageEl)  
    }
}

// Remove todo by id
const removeTodo = (id) =>{
    const todoIndex = todos.findIndex((todo)=>{
        return todo.id === id
    })

    if(todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo)=>{
        return todo.id === id
    })

    if(todo){
        todo.completed = !todo.completed
    }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo)=>{
    const todoEl = document.createElement('label')
    const  containerEl = document.createElement('div')
    const checkboxEl = document.createElement('input')
    const textEl = document.createElement('span')
    const removeButton = document.createElement('button')

    // setup todo checkbox
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.checked = todo.completed
    containerEl.appendChild(checkboxEl)
    
    checkboxEl.addEventListener('change', ()=>{
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // setup todo text
    textEl.textContent = todo.text
    containerEl.appendChild(textEl)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // setup todo remove button
    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', ()=>{
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos)=>{
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const todoCount = incompleteTodos.length > 1? 'todos': 'todo'
    summary.textContent = `You have ${incompleteTodos.length} ${todoCount} left`    
    return summary
}

// alert(uuidv4());