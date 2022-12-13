import React, { useState, useEffect } from "react";
import axios from "axios";
function Usuario(props) {
  const [usuario, setUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const getUserById = (id) => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        { headers: { Authorization: "carlos-eduardo-barbosa" } }
      )
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserById(props.usuario.id);
  }, []);

  const editUser = (id) => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`;

    const body = { name: nome, email: email };
    axios
      .put(url, body, { headers: { Authorization: "carlos-eduardo-barbosa" } })
      .then((response) => {
        alert("Usuário editado com sucesso");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (id) => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`;
    axios
      .delete(url, { headers: { Authorization: "carlos-eduardo-barbosa" } })
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {editar ? (
        <div>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => editUser(props.usuario.id)}>
            Enviar alterações
          </button>
        </div>
      ) : (
        <>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={() => deleteUser(props.usuario.id)}>Excluir</button>
    </>
  );
}

export default Usuario;
