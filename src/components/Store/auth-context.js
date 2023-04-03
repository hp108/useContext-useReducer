import React,{useEffect,useState} from "react";

const AuthContext = React.createContext(
    {
        isLoggedIn : true,
        onLogout : ()=>{}, 
        onLogin : (email,password)=>{}
    }
);

export const AuthContextProvider = (props) =>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("login") === "1") {
          setIsLoggedIn(true);
        }
      }, []);
    
      const loginHandler = (email, password) => {
        localStorage.setItem("login", "1");
        // We should of course check email and password
        // But it's just a dummy demo anyways
        setIsLoggedIn(true);
      };
    
      const logoutHandler = () => {
        localStorage.removeItem("login");
        setIsLoggedIn(false);
      };
    return(
        <AuthContext.Provider value={
          {isLoggedIn:isLoggedIn, onLogout:logoutHandler , onLogin : loginHandler
          }
        }
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;