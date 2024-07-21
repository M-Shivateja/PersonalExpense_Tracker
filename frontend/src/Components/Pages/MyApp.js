import React from "react";
import GetStarted from "./GetStarted";
import CreateAccount from "./CreateAccount";
import "./MyApp.css";

function MyApp() {
  return (
    <div className="myapp">
      <GetStarted />
      <CreateAccount />
    </div>
  );
}

export default MyApp;
