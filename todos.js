const fs = require("fs")

const generateID = () => new Date().getTime()
// const generateID = () => todos.length + 2

// console.log(generateID())


const todos = [
    {
        "id": "1",
        "title": "Todo 1",
        "completed": false
    },
    {
        "id": "2",
        "title": "Todo 2",
        "completed": true
    },
    {
        "id": "3",
        "title": "Todo 3",
        "completed": false
    }
]
// console.log(todos)

const writeTodos = (todos) => {
    fs.writeFile("todos.json", JSON.stringify(todos), "utf-8", (error)=> {
        if(error) throw error;
    
        console.log("файл создан");
    })
}
// writeTodos(todos)

const readTodos = (callback = () => {}) => {
    fs.readFile("./todos.json", "utf-8", (error, content) => {
        if(error) throw error;
    
        callback(JSON.parse(content))
    })
}
// readTodos((todos) => {
//     console.log(todos)
// })

const createTodo = (title) => {
    const todo = {
        id: generateID(),
        title: title,
        completed: false
    }

    readTodos((todos) => {
        const newTodos = [...todos, todo]

        // console.log(newTodos)
        writeTodos(newTodos)
    })
}
// createTodo("new todo 5")

const updateTodo = (id, body) => {
    Number(id)
     readTodos((todos) => {
        const newTodos = todos.map((todo) => {
            if(todo.id === id) {
                return {...todo, ...body};
            } else {
                return todo;
            }
        })

        writeTodos(newTodos)
    })
}

// updateTodo(1592476701809, {
//     title: "Updated NEW todo",
//     completed: true,
// })

const deleteTodo = (id) => {
    // let i = Number(id);
    readTodos((todos) => {
        const newTodos = todos.filter(todo => id !== todo.id);
        // console.log(newTodos)
        writeTodos(newTodos)
    })
}
// deleteTodo(1592438762825)

module.exports = {
    writeTodos,
    readTodos,
    createTodo,
    updateTodo,
    deleteTodo,
}