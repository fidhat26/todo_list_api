
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB Task model
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

// Format MongoDB documents for the API
function formatTask(task) {
    return {
        id: task._id.toString(),
        title: task.title,
        completed: task.completed,
    };
}

// Display all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks.map(formatTask));
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

// Add a new task
app.post('/tasks', async (req, res) => {
    try {
        const { title } = req.body;

        if (typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({
                message: 'Task title is required',
            });
        }

        const newTask = await Task.create({
            title: title.trim(),
            completed: false,
        });

        res.status(201).json(formatTask(newTask));
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task' });
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found',
            });
        }

        if (title !== undefined) {
            if (typeof title !== 'string' || !title.trim()) {
                return res.status(400).json({
                    message: 'Valid task title is required',
                });
            }
            task.title = title.trim();
        }

        if (completed !== undefined) {
            if (typeof completed !== 'boolean') {
                return res.status(400).json({
                    message: 'Completed must be true or false',
                });
            }
            task.completed = completed;
        }

        await task.save();
        res.json(formatTask(task));
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task' });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found',
            });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task' });
    }
});

// Connect to MongoDB before starting the server
async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is missing');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
}

startServer();
