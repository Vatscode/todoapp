import express from 'express';
import { createTodo, updateTodo } from './types.js';  //for importing functions you use {}
import  todo  from './db.js';  //for importing files no {} needed
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }

    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
})

app.get("/todos", async function(req, res) {
    // const todos = await todo.find({});

    res.json({
        todos: []
    })
})

app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }

    await todo.update({
        _id: req.body.id
    }, {
        completed: true  
    })

    res.json({
        msg: "Todo marked as completed"
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
