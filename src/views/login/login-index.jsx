import React from "react";
import Login from "./index";
import { LoginComponentController } from "./login.control";

const LoginComponent = () => {
  return (
    <>
      <LoginComponentController>
        <Login />
      </LoginComponentController>
    </>
  );
};

export default LoginComponent;
