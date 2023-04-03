import React from "react";
import AuthContext from "../Store/auth-context";
import classes from "./Navigation.module.css";
import { useContext } from "react";

const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
    <>
          {ctx.isLoggedIn && (
            <nav className={classes.nav}>
              <ul>
                <li>
                  <a href="/">Users</a>
                </li>
                <li>
                  <a href="/">Admin</a>
                </li>
                <li>
                  <button onClick={ctx.onLogout}>Logout</button>
                </li>
              </ul>
            </nav>
          ) }
      </>
  );
};

export default Navigation;
