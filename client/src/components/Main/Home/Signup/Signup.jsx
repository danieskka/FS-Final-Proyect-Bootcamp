import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Signup = ({ onSignUp }) => {
  
  const { register, handleSubmit } = useForm();

  const handleSignup = async (data) => {
    try {
      await axios.post("/signup", data);
      onSignUp();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <label>Email:</label>
      <input type="email" {...register("email", { required: true })} />

      <label>Password:</label>
      <input type="password" {...register("password", { required: true })} />

      <label>Username:</label>
      <input type="text" {...register("username", { required: true })} />

      <label>Firstname:</label>
      <input type="text" {...register("firstname", { required: true })} />

      <label>Lastname:</label>
      <input type="text" {...register("lastname", { required: true })} />

      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Signup;
