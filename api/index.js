const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extanded: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

const moment = require("moment");

mongoose
  .connect("mongodb+srv://mukesh:mukesh@cluster0.uycouqu.mongodb.net/")
  .then(() => {
    console.log("Conected to mongoDB");
  })
  .catch((error) => {
    console.log("Error Conecting to mongoDB", error);
  });
app.listen(port, () => {
  console.log("Server is running on port 3000");
});

const User = require("./models/user");
const Todo = require("./models/todo");
const { error } = require("console");

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if email is already register

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
    }

    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res.status(202).json({ message: "User registerd SUCCESSFULLY" });
  } catch (error) {
    console.log("Error registring the user", error);
    res.status(500).json({ message: "Registion failed" });
  }
});

const generateSicretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSicretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid mail" });
    }

    if (user.password != password) {
      return res.status(401).json({ message: "Invald Password" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Login Failed", error);
    res.status(500).json({ message: "Login Failed" });
  }
});

app.post("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, category } = req.body;

    const newTodo = new Todo({
      title,
      category,
      dueDate: moment().format("DD-MM-YYYY"),
    });
    await newTodo.save();

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not Found" });
    }

    user?.todos.push(newTodo._id);
    await user.save();
    res.status(200).json({ message: "Todo added Sucessfully", todo: newTodo });
  } catch (error) {
    res.status(200).json({ message: "Todo not added" });
  }
});

app.get("/user/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ error: "Somthing want wrong" });
  }
});

app.patch("/todos/:todoId/complete", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        status: "completed",
      },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not Found" });
    }
    res
      .status(200)
      .json({ message: "Todo marked as complete", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Something want wrong" });
  }
});

app.get("/todos/completed/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const completedTodos = await Todo.find({
      status: "completed",
      createdAt: {
        $gte: new Date(`${date}T00:00:00.000Z`), // Start of the selected date
        $lt: new Date(`${date}T32:59:59.999Z`), // End of the selected date
      },
    }).exec();

    res.status(200).json({ completedTodos });
  } catch (error) {
    res.status(500).json({ error: "Something went WRONG!" });
  }
});

app.get("/todos/count", async (req, res) => {
  try {
    const totalCompletedTodos = await Todo.countDocuments({
      status: "completed",
    }).exec();

    const totalPendingTodos = await Todo.countDocuments({
      status: "pending",
    }).exec();

    res.status(200).json({ totalCompletedTodos, totalPendingTodos });
  } catch (error) {
    res.status(500).json({ error: "Network Error." });
  }
});
