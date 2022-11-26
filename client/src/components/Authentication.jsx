import React, { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { APP_NAME } from "../Data";

//Authentication 

const Authentication = (props) => {
  const [login, setLogin] = useState(true);
  const [text, setText] = useState("Sign Up");

  return (
    <div>
      <h1 className="text-center text-5xl text-indigo-900 font-extrabold mt-14">
        {APP_NAME}
      </h1>
      {login ? (
        <LogIn
          setOnHome={props.setOnHome}
          setId={props.setId}
          setLogin={(login) => {
            setLogin(login);
          }}
          setText={setText}
        />
      ) : (
        <SignUp
          setOnHome={props.setOnHome}
          setId={props.setId}
          setLogin={(login) => {
            setLogin(login);
          }}
          setText={setText}
        />
      )}
    </div>
  );
};

export default Authentication;
