import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

import { useForm } from "../../shared/hooks/form-hook";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./Authenticate.css";


const Authenticate = () => {
  const auth = useContext(AuthContext)

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchLoginModeHandler = () => {
    if(!isLoginMode){
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    }else{
      setFormData({
        ...formState.inputs,
        name: {
          value: "",
          isValid: false,
        },
      }, false)
    }
    setIsLoginMode((preMode) => !preMode);
  };

  const authenticateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    
    auth.login()
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form className="authenticate-form" onSubmit={authenticateSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please end a valid password (minimum of 8 charactors)"
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "SignUp"}
        </Button>
      </form>
      <Button inverse onClick={switchLoginModeHandler}>
        Switch to {isLoginMode ? "SignUp" : "Login"}{" "}
      </Button>
    </Card>
  );
};

export default Authenticate;
