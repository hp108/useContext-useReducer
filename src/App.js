import React from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { useContext } from "react";
import AuthContext from "./components/Store/auth-context";
import MainHeader from "./components/MainHeader/MainHeader";
// import AuthContext from "./components/Store/auth-context";

function App() {

  const ctx = useContext(AuthContext)

  return (
    // <AuthContext.Provider
    //   value={{
    //     isLoggedIn: isLoggedIn,
    //     onLogout: logoutHandler,
    //     onLogin: loginHandler,
    //   }}
    // >
    <>
     <MainHeader/>
      <main>
        {!ctx.isLoggedIn && <Login  />}
        {ctx.isLoggedIn && <Home  />}
      </main>
      </>
  );
}

export default App;
