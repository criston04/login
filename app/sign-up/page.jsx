'use client'
import React, { useState } from "react";

import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";


const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const [createUserWithEmailAndPassword]= useCreateUserWithEmailAndPassword(auth); 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Agrega esto para evitar que la página se recargue
  
    if (!correo || !contraseña) {
      console.error("Por favor, complete todos los campos");
      return;
    }
  
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo)) {
      console.error("Correo electrónico inválido");
      return;
    }
  
    if (contraseña.length < 6) {
      console.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
  
    try {
      const res = await createUserWithEmailAndPassword(auth, correo, contraseña);
      console.log({ res });
      setCorreo("");
      setContraseña("");
    } catch (error) {
      console.error("Error al crear usuario:", error.message, error.code);
      // Agrega una alerta o mensaje de error para informar al usuario
    }
  };
    

  return (
    <div className="max-w-md mx-auto p-4 mt-12 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Registro</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombres
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellidos">
            Apellidos
          </label>
          <input
            id="apellidos"
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edad">
            Edad
          </label>
          <input
            id="edad"
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
            Correo electrónico
          </label>
          <input
            id="correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contraseña">
            Contraseña
          </label>
          <input
            id="contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Registrarse
        </button>
    </div>
  );

};

export default Registro;