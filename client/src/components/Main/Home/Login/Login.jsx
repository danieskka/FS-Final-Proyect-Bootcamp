import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../../../context/authContext";

const Login = ( {onLogin} ) => {
  
  const {setId} = useContext(AuthContext)
  const { register, handleSubmit } = useForm();

  const handleLogin = async (data) => {
    onLogin();
    try {
      await axios.post("/login", data);
      setId(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="sign-up-form">
      <label>Email:</label>
      <input type="email" {...register("email", { required: true })} />

      <label>Password:</label>
      <input type="password" {...register("password", { required: true })} />

      <button type="submit">Log in</button>
    </form>
  );
};

export default Login;
