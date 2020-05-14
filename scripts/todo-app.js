let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', (e)=>{
    e.preventDefault() // remove original behaviour of form submit
    let text = e.target.elements.newTodoText.value.trim()

    if (text){
        todos.push({
            id: uuidv4(),
            text, // ES6 feature
            completed: false
        })
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.newTodoText.value = ''
    }
})

document.querySelector('#hide-completed').addEventListener('change', (e)=>{
    filters.hideCompleted = e.target.checked
    renderTodos(todos,filters)
})




/**
 * {
    text: 'Order cat food',
    completed: false
}, {
    text: 'Clean kitchen',
    completed: true
}, {
    text: 'Buy food',
    completed: true
}, {
    text: 'Do work',
    completed: false
}, {
    text: 'Exercise',
    completed: true
}
 */
