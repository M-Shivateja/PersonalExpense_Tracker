// import logo from "./logo.svg";
import "./App.css";
import Loginpage from "./Components/Pages/Loginpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Myprofile from "./Components/Pages/Myprofile";
import Registerpage from "./Components/Pages/Registerpage";
import Header from "./Components/Pages/Header";
import { useState, createContext } from "react";
import PrivateRut from "./Components/PvtRoute/PrivateRut";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MyApp from "./Components/Pages/MyApp";

export const store = createContext();

function App() {
  const [token, setToken] = useState();

  return (
    <>
      <store.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MyApp />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route
              path="/myprofile"
              element={
                <PrivateRut>
                  <Myprofile />
                </PrivateRut>
              }
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </store.Provider>
    </>
  );
}

export default App;
