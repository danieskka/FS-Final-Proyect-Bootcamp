import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {

  const { register, handleSubmit } = useForm();

  const handleLogin = async (data) => {
    try {
      await axios.post("/login", data);
      
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <label>Email:</label>
      <input type="email" {...register("email", { required: true })} />

      <label>Password:</label>
      <input type="password" {...register("password", { required: true })} />

      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
