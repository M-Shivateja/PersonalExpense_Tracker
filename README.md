# Personal Expense Tracker

Welcome to the Personal Expense Tracker application! This project is designed to help users manage their expenses effectively, offering a range of features including user management, 
expense management,category management, and advanced visualization tools charts and graph.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**
  - User login and registration
  - Secure access to profile page

- **Expense Management**
  - Add, edit, and delete expenses
  - View all expenses
  - Filter expenses by categories

- **Category Management**
  - Create and select custom categories
  - Integrate more category options

- **Summaries and Insights**
  - Visualize spending data using graphs and charts (pie charts for category spending, line charts for spending over time)

## Technologies Used

- **Frontend**: ReactJS, React Router v6, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Testing**: Postman
- **Version Control**: GitHub

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/personal-expense-tracker.git
    ```

2. Navigate to the project directory:
    ```bash
    cd personal-expense-tracker
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

    Required dependencies:
    - axios
    - react-router-dom
    - bootstrap
    - toast
    - chart.js
    - react-chartjs

3. Start the frontend development server:
    ```bash
    npm start
    ```

### Backend Setup

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

    Required dependencies:
    - bcrypt
    - jsonwebtoken
    - express
    - node
    - mongoose
    - cors

3. Start the backend server:
    ```bash
    node server
    ```

## Usage

Once the servers are up and running, you can access the application at `http://localhost:3000`. 

- **Register/Login**: Create an account or log in to your existing account and also creacte your account with registration.
- **Add Expenses**: To add new expenses.
- **View and Filter Expenses**: View all your expenses and filter them by categories.
- **Category Management**: Add and manage your custom categories.
- **Visualize Data**: Use the summary and insights section to see visual representations of your spending.

## Contributing

Contributions are what make the open-source community such an amazing place to be. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

