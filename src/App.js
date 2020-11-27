import React, { useState, useEffect } from 'react';

import api from './services/api';

function App() {
  
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadUser() {
      const res = await api.get('/users')

      setUsers(res.data);
    }
    loadUser();
  }, []);

  async function handleAddUser(e) {
    e.preventDefault();

    if(!id) {
      const res = await api.post('/users', {
        firstName,
        lastName,
        userName,
        email
      });
  
      setUsers([...users, res.data]);
    } else {
      handleEditUser(id);
    }

    clearForm();
  };

  async function handleEditUser(id) {
    const index = users.findIndex(user => user._id === id)

    let usersNew = users.slice();

    usersNew.splice(index, 1);

    await api.put(`/users/${id}`, {
      firstName,
      lastName,
      userName,
      email
    });

    setUsers([...usersNew, { _id : id, firstName, lastName, userName, email }]);

    clearForm();
  }

  async function handleDeleteUser(id) {
    const index = users.findIndex(user => user._id === id)

    let usersNew = users.slice();

    usersNew.splice(index, 1);

    await api.delete(`/users/${id}`);

    setUsers(usersNew);
  }

  function fillForm(user) {
    setId(user._id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUserName(user.userName);
    setEmail(user.email);
  }

  function clearForm() {
    setId('')
    setFirstName('');
    setLastName('');
    setUserName('');
    setEmail('');
  }

  return (
    <div id="app">
      <form onSubmit={handleAddUser}>
        <label htmlFor="first_name">Nome:</label><br/>
        <input 
          name="first_name"
          id="first_name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        /><br/>
        <label htmlFor="last_name">Sobrenome:</label><br/>
        <input 
          name="last_name"
          id="last_name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        /><br/>
        <label htmlFor="username">Nome de usuario:</label><br/>
        <input 
          name="username"
          id="username"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          required
        /><br/>
        <label htmlFor="email">Email:</label><br/>
        <input 
          name="email"
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Salvar</button>
        <button onClick={clearForm}>Limpar</button>
      </form>
      <br/>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Nome de usuario</th>
            <th>Email</th>
            <th colSpan="2">Opções</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td><button onClick={() => fillForm(user)}>Editar</button></td>
              <td><button onClick={() => handleDeleteUser(user._id)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
