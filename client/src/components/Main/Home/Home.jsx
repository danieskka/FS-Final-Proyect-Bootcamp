import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Home = () => {
  
  const { register, handleSubmit, reset } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (data) => {
    try {
      await axios.post("http://localhost:3000/signup", data);
      setIsRegistered(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLogin = async (data) => {
    // Lógica para realizar la solicitud de login
  };

  return (
    // Sign up
    <div>
      {isRegistered ? (
        <p>¡Registro exitoso! Ahora puedes iniciar sesión.</p>
      ) : (
        <div>
          <h2>Registro</h2>
          <form onSubmit={handleSubmit(handleRegister)}>
            <label>Email:</label>
            <input type="email" {...register("email", { required: true })} />

            <label>Password:</label>
            <input
              type="password"
              {...register("password", { required: true })}
            />

            <label>Username:</label>
            <input
              type="text"
              {...register("username", { required: true })}
            />

            <label>Firstname:</label>
            <input
              type="text"
              {...register("firstname", { required: true })}
            />

            <label>Lastname:</label>
            <input
              type="text"
              {...register("lastname", { required: true })}
            />

            <button type="submit">Registrarse</button>
          </form>
        </div>
      )}

      {/* Login  */}
      <div>
        <h2>Iniciar sesión</h2>
        {/* Aquí coloca el formulario de inicio de sesión */}
      </div>
    </div>
  );
};

export default Home;
