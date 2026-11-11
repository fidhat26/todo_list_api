const express = require('express');

const app = express();
const PORT= process.env.PORT || 5000;

app.use(express.json());


let tasks = [];
let id = 1;

//Display all tasks
app.get("/tasks",(req, res) =>{
    res.json(tasks);
});

//Add a new task
app.post("/tasks", (req, res) =>{
    const { title } = req.body;

    if(!title || !title.trim()){
        return res.status(400).json({
            message : "Task title is required",
        });
    }

    const newTask = {
        id : id++,
        title : title.trim(),
        completed: false,
    };

    tasks.push(newTask);
});

//Update a Task
app.put("/tasks/:id", (req, res)=>{
    const task = tasks.find(
        (t) => t.id === Number(req.params.id)
    );

    if(!task){
        return res.status(404).json({
            message: "Task not found",
        });
    }

    const { title, completed } = req.body;

    if(title !== undefined){
        if(typeof title !== "String" || !title.trim()){
            return res.status(400).json({
                message: "Valid task title is required",
            });
        }

        task.title = title.trim();
    }

    if(completed !== undefined){
        if(typeof completed !== "boolean"){
            return res.status(400).json({
                message: "Completed must be true or false",
            });
        }
        task.completed = completed;
    }
    res.json(task);
});

//Remove a task
app.delete("/tasks/:id", (req, res)=>{
    const taskExists = tasks.some(
        (t) => t.id ===Number(req.params.id)
    );

    if(!taskExists){
        return res.status(404).json({
            message: "Task not found",
        });
    }

    tasks = tasks.filter(
        (t) => t.id !== Number(req.params.id)
    );
    res.json({
        message: "Task deleted successfully",
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

