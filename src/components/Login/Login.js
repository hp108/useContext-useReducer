import React, { useEffect, useState, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { useContext } from "react";
import AuthContext from "../Store/auth-context";

const reducerFn = (state, action) => {
  if (action.type === "HANDLER") {
    return { val: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "VALIDATE_EMAIL") {
    return { val: state.val, isValid: state.val.includes("@") };
  }
  return { val: "", isValid: null };
};

const passReducer = (state, action) => {
  if (action.type === "HANDLER") {
    return { val: action.value, isValid: action.value.length > 6 };
  }
  if (action.type === "VALIDATE_PASS") {
    return { val: state.val, isValid: state.val.length > 6 };
  }
};
const Login = ()=>{ 

  const ctx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [email, dispatchEmail] = useReducer(reducerFn, {
    val: "",
    isValid: null,
  });
  const [pass, dispatchPass] = useReducer(passReducer, {
    val: "",
    isValid: null,
  });

  // const {isValid : emailisValid} =  email;
  // const {isValid : passisValid} = pass

  useEffect(() => {
    const x = setTimeout(() => {
      console.log("hello");
      setFormIsValid(email.isValid && pass.isValid);
    }, 500);

    return () => {
      console.log("in return");
      clearTimeout(x);
    };
  }, [email.isValid, pass.isValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "HANDLER", value: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && pass.val.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPass({ type: "HANDLER", value: event.target.value });
    setFormIsValid(
      event.target.value.trim().length > 6 && email.val.includes("@")
    );
    // setEmailIsValid(enteredEmail.includes('@'));x
    // setPasswordIsValid(pass.val.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "VALIDATE_EMAIL" });
  };

  const validatePasswordHandler = () => {
    dispatchPass({ type: "VALIDATE_PASS" });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(email.val, pass.val);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            email.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            pass.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={[pass.val]}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;
