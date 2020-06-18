const http = require("http")
const { readTodos, createTodo, deleteTodo, updateTodo } = require("./todos.js")


const server = http.createServer((request, response) => {
    console.log("URL", request.url);
    console.log("METHOD", request.method);

    if(request.method === "GET" && request.url.match("/todos")) {
        const url = new URLSearchParams(request.url).toString();
        let param = url.split("=")[1];
        if(param === "true") {
            response.setHeader("Content-Type", "application/json");
            readTodos((todos) => {
                const newTodos =  todos.filter(todo => todo.completed)
                response.end(JSON.stringify(newTodos))
            })
        }
        if(param === "false") {
            response.setHeader("Content-Type", "application/json");
            readTodos((todos) => {
                const newTodos =  todos.filter(todo => !todo.completed)
                response.end(JSON.stringify(newTodos))
            })
        }
        if(param === "") {
            response.setHeader("Content-Type", "application/json");
            readTodos((todos) => {
                response.end(JSON.stringify(todos))
            })
        }
    }

    if(request.method === "POST" && request.url === "/todos") {
        let rawData = "";
        request.on("data", (chunk) => (rawData += chunk));
        request.on("end", () => {
            try {
                const { title } = JSON.parse(rawData)
                createTodo(title)
                response.writeHead(201, {"Content-Type" : "text/plain"});
                response.end("Задача создана");
            } catch (error){
                console.log(error)
            }
        })
    }

    if(request.method === "DELETE" && request.url.match("/todos")) {
        const url = request.url.toString();
        let param = url.substr(7)
        let id = Number(param)
        try {
            deleteTodo(id);
            response.writeHead(204, {"Content-Type" : "text/plain"});
            response.end();
        } catch (error){
            console.log(error)
        }
    }

    if(request.method === "PUT" && request.url.match("/todos")) {
        const url = request.url.toString();
        let id = Number(url.substr(7));
        let rawData = "";
        request.on("data", (chunk) => (rawData += chunk));
        request.on("end", () => {
            try {
                const body = JSON.parse(rawData)
                console.log(body)
                updateTodo(id, body)
                response.writeHead(204, {"Content-Type" : "text/plain"});
                response.end("Задача изменена");
            } catch (error){
                console.log(error)
            }
        })
    }    
})
 server.listen(3009)

//  http://localhost:3009



//"POST" - { "title": "new task"} 
//"PUT"  - {
//     "title": "Updated TODO",
//     "completed": true
// }

//======================================================================
//с урока
// http.get("http://nodejs.org/dist/index.json", (res) => {
//     const { statusCode} = res

//     if(statusCode !== 200) {
//         console.log("error")
//         return
//     }

//     let rawData = "";
//     res.on("data", (chunk) => { 
//         console.log("chunk");
//         rawData += chunk ;
//     })
//     res.on("end", () => {
//         try {
//             const parsedData = JSON.parse(rawData);
//             // console.log(parsedData);
//           } catch (e) {
//             // console.error(e.message);
//           }
//     })
// })