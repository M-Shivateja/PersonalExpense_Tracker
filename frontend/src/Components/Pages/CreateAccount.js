import React from "react";
import "./CreatAccount.css";
import { Link } from "react-router-dom";
function CreateAccount() {
  return (
    <div>
      <section id="cta" className="cta">
        <h2>Ready to take the next step?</h2>
        <Link to="/register">
          <button className="cta-button">CreateAccount</button>
        </Link>
      </section>
    </div>
  );
}

export default CreateAccount;
