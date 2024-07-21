import React from "react";
import "./GetStarted.css";
import { Link } from "react-router-dom";
function GetStarted() {
  return (
    <div>
      <section id="get" className="get">
        <h1>Welcome to Personal Expense Tracker</h1>
        <p>Hi....</p>
        <Link to="/login">
          <button className="get-button">Get Started</button>
        </Link>
      </section>
    </div>
  );
}

export default GetStarted;
