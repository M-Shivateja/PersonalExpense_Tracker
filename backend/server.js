const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const comparePassword = require("./Hashing/Comparepass");
const hashPassword = require("./Hashing/Hashpasw");
const Registerdata = require("./model/Register");
const Verify = require("./middleware/verify");
const cors = require("cors");
const app = express();

///Database Connection
mongoose
  .connect("add you DB Connection string")
  .then(() => console.log("connected to Mongo Database"));

/// defines the body format as json in each level where ever require
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

//// registration data checks
app.post("/register", async function (req, res) {
  try {
    const { email, Name, phone, password, confirmpassword } = req.body;

    const existinguser = await Registerdata.findOne({ email });

    if (existinguser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (!(password === confirmpassword)) {
      return res.status(400).json({ message: "passwords do not match" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new Registerdata({
      email,
      Name,
      phone,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });

    await newUser.save();
    res.status(200).send({ message: "registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal server error" });
  }
});

//// login data
app.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    const existinguser = await Registerdata.findOne({ email });

    if (!existinguser) {
      return res.status(400).send({ message: "please register" });
    }

    const checkPassword = await comparePassword(
      password,
      existinguser.password
    );

    if (!checkPassword) {
      return res.status(400).send({ message: "password is incorrect" });
    }

    //  object id that is generated with unique value in DB For each user
    const payload = {
      user: {
        id: existinguser.id,
      },
    };

    jwt.sign(payload, "Scrt", { expiresIn: 120000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token, userId: existinguser.id });
    });
  } catch (error) {
    console.log(error);
  }
});

/// protected route my profile
app.get("/myprofile", Verify, async (req, res) => {
  try {
    const existinguser = await Registerdata.findById(req.user.id);
    if (!existinguser) {
      return res.status(400).send("user not found");
    }
    res.json(existinguser);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

// Models
const Expense = mongoose.model(
  "Expense",
  new mongoose.Schema({
    date: { type: Date, default: Date.now },
    amount: Number,
    category: String,
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Add user reference
  })
);

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: String,
  })
);

// Get all expenses for the logged-in user
app.get("/expenses", Verify, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get expenses by category for the logged-in user
app.get("/expenses/category/:category", Verify, async (req, res) => {
  try {
    const expenses = await Expense.find({
      category: req.params.category,
      user: req.user.id,
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new expense
app.post("/expenses", Verify, async (req, res) => {
  const expense = new Expense({
    date: req.body.date,
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
    user: req.user.id, // Include the user ID
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit an expense
app.patch("/expenses/:id", Verify, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (req.body.date != null) expense.date = req.body.date;
    if (req.body.amount != null) expense.amount = req.body.amount;
    if (req.body.category != null) expense.category = req.body.category;
    if (req.body.description != null)
      expense.description = req.body.description;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an expense
app.delete("/expenses/:id", Verify, async (req, res) => {
  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedExpense)
      return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted", deletedExpense });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new category
app.post("/categories", async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
