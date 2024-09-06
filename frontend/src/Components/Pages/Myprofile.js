import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import "./Myprofile.css";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

function Myprofile() {
  const [user, setUser] = useState({ email: "", Name: "", phone: "" });
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: "",
    amount: "",
    category: "",
    description: "",
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingExpenses, setLoadingExpenses] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.BACKEND_URL}/myprofile`,
          {
            headers: { Authorization: token },
          }
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.BACKEND_URL}/expenses`,
          {
            headers: { Authorization: token },
          }
        );
        setExpenses(response.data);
        setLoadingExpenses(false);
      } catch (error) {
        console.error("Failed to fetch expenses", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.BACKEND_URL}/categories`,
          {
            headers: { Authorization: token },
          }
        );
        setCategories(response.data);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchProfile();
    fetchExpenses();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditingExpense({ ...editingExpense, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.BACKEND_URL}/expenses`, newExpense, {
        headers: { Authorization: token },
      });
      // Refresh expenses after adding new expense
      const response = await axios.get(`${process.env.BACKEND_URL}/expenses`, {
        headers: { Authorization: token },
      });
      setExpenses(response.data);
      setNewExpense({
        date: "",
        amount: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to add expense", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${process.env.BACKEND_URL}/expenses/${editingExpense._id}`,
        editingExpense,
        {
          headers: { Authorization: token },
        }
      );
      // Refresh expenses after update
      const response = await axios.get(`${process.env.BACKEND_URL}/expenses`, {
        headers: { Authorization: token },
      });
      setExpenses(response.data);
      setEditingExpense(null); // Clear editing state
    } catch (error) {
      console.error("Failed to update expense", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.BACKEND_URL}/expenses/${id}`, {
        headers: { Authorization: token },
      });
      // Refresh expenses after deletion
      const response = await axios.get(`${process.env.BACKEND_URL}/expenses`, {
        headers: { Authorization: token },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to delete expense", error);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.BACKEND_URL}/categories`,
        { name: newCategory },
        {
          headers: { Authorization: token },
        }
      );
      // Refresh categories after adding new one
      const response = await axios.get(
        `${process.env.BACKEND_URL}/categories`,
        {
          headers: { Authorization: token },
        }
      );
      setCategories(response.data);
      setNewCategory("");
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  // Filtered expenses based on selected category
  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  // Calculate total amount of filtered expenses
  const totalAmount = filteredExpenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );

  const getPieChartData = () => {
    const categoryAmounts = categories.reduce((acc, category) => {
      acc[category.name] = 0;
      return acc;
    }, {});

    expenses.forEach((expense) => {
      if (categoryAmounts[expense.category] !== undefined) {
        categoryAmounts[expense.category] += parseFloat(expense.amount);
      }
    });

    return {
      labels: Object.keys(categoryAmounts),
      datasets: [
        {
          data: Object.values(categoryAmounts),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  };

  const getLineChartData = () => {
    const dateAmounts = {};

    expenses.forEach((expense) => {
      const date = expense.date.substring(0, 10); // Get date part only
      if (!dateAmounts[date]) {
        dateAmounts[date] = 0;
      }
      dateAmounts[date] += parseFloat(expense.amount);
    });

    const sortedDates = Object.keys(dateAmounts).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    return {
      labels: sortedDates,
      datasets: [
        {
          label: "Spending Over Time",
          data: sortedDates.map((date) => dateAmounts[date]),
          fill: false,
          backgroundColor: "#36A2EB",
          borderColor: "#36A2EB",
        },
      ],
    };
  };

  if (loading || loadingExpenses || loadingCategories) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-between align-items-center mb-4">
        <div className="col-md-12">
          <div className="card mb-4" id="profilec">
            <div className="card-header">
              <h3 className="mb-0">HI {user.Name}</h3>
            </div>
            <div className="card-body text-center" id="profile2">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
            <h5 className="mb-0 text-center">
              Total Expense : ${totalAmount.toFixed(2)}
            </h5>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card mb-4" id="tabs">
            <div className="card-header">
              <h3 className="mb-0">Add Expenses</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={newExpense.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Amount:</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={newExpense.amount}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <select
                    name="category"
                    className="form-control"
                    value={newExpense.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={newExpense.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  id="mybutton"
                  className="btn btn-primary mt-3"
                >
                  Add Expense
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4" id="tabs">
            <div className="card-header">
              <h3 className="mb-0">Add Your New Categories</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleCategorySubmit}>
                <div className="form-group">
                  <label>Category Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newCategory}
                    onChange={handleCategoryChange}
                  />
                </div>
                <button
                  type="submit"
                  id="mybutton"
                  className="btn btn-primary mt-3"
                >
                  Add Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="chart-container">
            <Pie data={getPieChartData()} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-container">
            <Line data={getLineChartData()} />
          </div>
        </div>
      </div>
      {editingExpense && (
        <div className="card mb-4" id="tabs">
          <div className="card-header">
            <h3 className="mb-0">Edit Expense</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={editingExpense.date}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={editingExpense.amount}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select
                  name="category"
                  className="form-control"
                  value={editingExpense.category}
                  onChange={handleEditChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={editingExpense.description}
                  onChange={handleEditChange}
                ></textarea>
              </div>
              <button
                type="submit"
                id="mybutton"
                className="btn btn-primary mt-3"
              >
                Update Expense
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="card mb-4" id="tabs">
        <div
          className="card-header d-flex justify-content-between align-items-center"
          id="tabs"
        >
          <h3 className="mb-0">Expense List</h3>
          <select
            className="form-control"
            value={selectedCategory}
            onChange={handleCategoryFilterChange}
            style={{ width: "200px" }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="card-body" id="tabs">
          <ul className="list-group">
            {filteredExpenses.map((expense) => (
              <li
                key={expense._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>
                    {expense.date ? expense.date.substring(0, 10) : "No Date"}
                  </strong>{" "}
                  - ${expense.amount} - {expense.category} -{" "}
                  {expense.description}
                </div>
                <div>
                  <button
                    id="update"
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditingExpense(expense)}
                  >
                    Edit
                  </button>
                  <button
                    id="update"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(expense._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Myprofile;
