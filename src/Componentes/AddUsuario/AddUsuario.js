import React, { useState, useEffect } from "react";
import axios from "axios";

function AddUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const createUser = () => {
    const url =
      "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";
    const config = { headers: { Authorization: "carlos-eduardo-barbosa" } };
    const body = {
      name: nome,
      email: email
    };

    axios
      .post(url, body, config)
      .then((response) => {
        alert("usuário criado com sucesso");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <p>Adicionar novo usuario</p>
      <input
        placeholder={"nome"}
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={createUser}>Enviar</button>
    </>
  );
}

export default AddUsuario;
